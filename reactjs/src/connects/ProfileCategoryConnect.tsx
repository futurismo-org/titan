import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import {
  fetchProfileCategory,
  fetchProfileChallenges
} from '~/actions/profileAction';
import { fetchCategory } from '~/actions/categoryAction';
import { fetchHistories } from '~/actions/historyAction';
import moment, { formatDatetime, formatDateShort } from '~/lib/moment';
import { RESET } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory,
      fetchProfileCategory,
      fetchProfileChallenges,
      fetchHistories
    },
    dispatch
  );

const summerizeHistories = (histories: any) => {
  let summerized: any[] = [];

  let startHistory: any | null = null;
  let endHistory: any | null = null;
  let count = 1;

  histories.forEach((history: any) => {
    if (
      startHistory === null &&
      endHistory === null &&
      history.type === 'RESET'
    ) {
      startHistory = history;
      return;
    }

    if (
      startHistory !== null &&
      endHistory === null &&
      history.type === 'RESET'
    ) {
      endHistory = history;

      const startDate = startHistory.timestamp.toDate();
      const endDate = endHistory.timestamp.toDate();
      const duration = moment.duration(moment(endDate).diff(startDate));

      const days = duration.asDays();
      const hours = duration.asHours() % 24;
      const minutes = duration.asMinutes() % 60;
      const durationMessage = `${days.toFixed(0)}日${hours.toFixed(
        0
      )}時間${minutes.toFixed(0)}分`;

      const record = {
        id: shortId.generate(),
        startDate,
        endDate,
        duration: durationMessage,
        attempt: count
      };

      summerized.push(record);

      startHistory = endHistory;
      endHistory = null;
      count++;

      return;
    }
  });

  return summerized;
};

const summerizeChallenges = (challenges: any) => {
  return challenges.map((challenge: any) => {
    return {
      id: shortId.generate(),
      title: challenge.title,
      totalDuration: challenge.totalDuration,
      resetCount: challenge.resetCount,
      percentage: (challenge.resetCount / challenge.totalDuration) * 100,
      closedAt: challenge.closedAt && challenge.closedAt.toDate()
    };
  });
};

const calcAccHistories = (histories: any) => {
  const resets = histories.filter((history: any) => history.type === RESET);

  let count = 0;
  return resets.map((data: any) => {
    count++;

    return {
      count,
      date: formatDateShort(data.timestamp.toDate())
    };
  });
};

const aggregateDayOfTheWeek = (histories: any) => {
  const resets = histories.filter((history: any) => history.type === RESET);

  const map = resets.reduce((result: any, current: any) => {
    const day = current.timestamp.toDate().getDay();

    const element = result.find((p: any) => {
      return p.day === day;
    });

    if (element) {
      element.count++; // count
    } else {
      result.push({
        day,
        count: 1
      });
    }
    return result;
  }, []);

  return [
    [0, '日'],
    [1, '月'],
    [2, '火'],
    [3, '水'],
    [4, '木'],
    [5, '金'],
    [6, '土']
  ].map((pair: any) => {
    const element = map.find((p: any) => p.day === pair[0]);
    if (element) {
      return {
        day: pair[1],
        count: element.count
      };
    } else {
      return {
        day: pair[1],
        count: 0
      };
    }
  });
};

const aggregateTimezone = (histories: any) => {
  const resets = histories.filter((history: any) => history.type === RESET);

  const map = resets.reduce((result: any, current: any) => {
    const hour = current.timestamp.toDate().getHours();

    const element = result.find((p: any) => {
      return p.hour === hour;
    });

    if (element) {
      element.count++; // count
    } else {
      result.push({
        hour,
        count: 1
      });
    }
    return result;
  }, []);

  return [...Array(24).keys()].map(n => {
    const element = map.find((p: any) => p.hour === n);
    if (element) {
      return element;
    } else {
      return {
        hour: n,
        count: 0
      };
    }
  });
};

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const categoryId = props.match.params.categoryId;

  console.log(props.match.params.userShortId);

  const categoryResourceId = `/categories/${categoryId}`;
  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  const profileCategoryHistoriesResourceId = `/profiles/${userShortId}/categories/${categoryId}/histories`;
  const profileChallengesResourceId = `/profiles/${userShortId}/challenges`;

  const profileCategory = state.profile.target;
  const category = state.category.target;

  const headline =
    category && profileCategory
      ? `${profileCategory.userDisplayName}さんの記録`
      : '';

  const metadata = category && {
    categoryTitle: category.title,
    categoryDescription: category.description,
    categoryId: category.id,
    headline
  };

  const histories = state.history.items.sort(
    (x: any, y: any) => x.timestamp.seconds - y.timestamp.seconds
  );

  const challenges = state.profile.items;
  const summerized = summerizeHistories(histories);
  const challengeResults = summerizeChallenges(challenges);

  const resetAccData = calcAccHistories(histories);
  const resetTimezones = aggregateTimezone(histories);
  const resetDaysOfTheWeek = aggregateDayOfTheWeek(histories);

  let data;
  if (profileCategory) {
    const lastResetDate = profileCategory.lastResetDate
      ? formatDatetime(profileCategory.lastResetDate.toDate())
      : '記録なし';

    const myBest =
      profileCategory.toMaxDays && profileCategory.toMaxDays !== 0
        ? `自己ベストまであと${profileCategory.toMaxDays}日`
        : '自己ベスト更新中！';

    data = {
      days: profileCategory.days,
      maxDays: profileCategory.maxDays,
      lastResetDate,
      myBest,
      summerized,
      resetAccs: resetAccData,
      challenges: challengeResults,
      resetTimezones,
      resetDaysOfTheWeek
    };
  } else {
    data = {};
  }

  return {
    data,
    metadata,
    loading:
      state.profile.loading ||
      state.category.loading ||
      state.history.loading ||
      state.profile.loadingSub,
    error:
      state.profile.error ||
      state.category.error ||
      state.history.error ||
      state.profile.errorSub,
    profileCategoryResourceId,
    profileCategoryHistoriesResourceId,
    profileChallengesResourceId,
    categoryResourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
