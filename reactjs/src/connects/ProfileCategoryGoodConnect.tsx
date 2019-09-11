import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import {
  fetchProfileCategory,
  fetchProfileChallenges
} from '~/actions/profileAction';
import { fetchHistories } from '~/actions/historyAction';
import moment, {
  formatDateShort,
  isClosed,
  formatDatetime,
  formatYearDateLong
} from '~/lib/moment';
import { RESET, RECORD } from '~/lib/challenge';
import { wrapShowN } from '~/lib/general';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
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
      history.type === RESET
    ) {
      startHistory = history;
      return;
    }

    if (
      startHistory !== null &&
      endHistory === null &&
      history.type === RESET
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

const summerizeChallenges = (challenges: any, categoryId: string) => {
  return challenges
    .filter(
      (challenge: any) =>
        challenge.closedAt && isClosed(challenge.closedAt.toDate())
    )
    .filter((challenge: any) => challenge.categoryId === categoryId)
    .map((challenge: any) => {
      return {
        id: challenge.id,
        title: challenge.title,
        totalDuration: challenge.totalDuration,
        totalCount: challenge.totalCount,
        resetCount: challenge.resetCount,
        percentage: challenge.totalDuration
          ? ((challenge.resetCount / challenge.totalDuration) * 100).toFixed(0)
          : 0,
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
  const records = histories.filter((history: any) => history.type === RECORD);

  const map = records.reduce((result: any, current: any) => {
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
  const records = histories.filter((history: any) => history.type === RECORD);

  const map = records.reduce((result: any, current: any) => {
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
  const { category, userShortId } = props;
  const categoryId = category.id;

  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  const profileCategoryHistoriesResourceId = `/profiles/${userShortId}/categories/${categoryId}/histories`;
  const profileChallengesResourceId = `/profiles/${userShortId}/challenges`;

  const profileCategory = state.profile.target;

  const headline =
    category && profileCategory
      ? `${profileCategory.userDisplayName}さんの記録`
      : '';
  const joinedDate = `${formatYearDateLong(
    category.createdAt.toDate()
  )}から開始`;

  const metadata = category && {
    categoryTitle: category.title,
    categoryDescription: category.description,
    categoryId: category.id,
    headline,
    joinedDate
  };

  const histories = state.history.items.sort(
    (x: any, y: any) => x.timestamp.seconds - y.timestamp.seconds
  );

  const challenges = state.profile.items.filter((challenge: any) => challenge);
  const summerized = summerizeHistories(histories);
  const challengeResults = summerizeChallenges(challenges, categoryId);

  const resetAccData = calcAccHistories(histories);
  const recordTimezones = aggregateTimezone(histories);
  const recordDaysOfTheWeek = aggregateDayOfTheWeek(histories);

  const resets = histories.filter((history: any) => history.type === RESET);
  const lastResetDate =
    !resets || resets.length === 0
      ? '記録なし'
      : formatDatetime(resets[resets.length - 1].timestamp.toDate());

  let data;
  if (profileCategory) {
    data = {
      days: wrapShowN(profileCategory.days),
      maxDays: wrapShowN(profileCategory.maxDays),
      lastResetDate,
      summerized,
      resetAccs: resetAccData,
      challenges: challengeResults,
      recordTimezones,
      recordDaysOfTheWeek
    };
  } else {
    data = {};
  }

  return {
    data,
    metadata,
    loading:
      state.profile.loading ||
      state.history.loading ||
      state.profile.loadingSub,
    error: state.profile.error || state.history.error || state.profile.errorSub,
    profileCategoryResourceId,
    profileCategoryHistoriesResourceId,
    profileChallengesResourceId,
    userShortId,
    categoryKind: category && category.kind,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
