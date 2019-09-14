import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  fetchProfileCategory,
  fetchProfileChallenges
} from '~/actions/profileAction';
import { fetchHistories } from '~/actions/historyAction';
import moment, {
  isClosed,
  formatDatetime,
  formatYearDateLong,
  formatDateShort,
  formatYearMonth
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

const aggregateByWeek = (histories: any) => {
  const records = histories.filter((history: any) => history.type === RECORD);

  const weeks = records.reduce((result: any, current: any) => {
    const weeksFromToday = moment(current.timestamp.toDate()).diff(
      moment(),
      'weeks'
    );

    const element = result.find((p: any) => {
      return p.duration === weeksFromToday;
    });

    if (element) {
      element.count++;
    } else {
      result.push({
        duration: weeksFromToday,
        count: 1
      });
    }
    return result;
  }, []);

  return weeks
    .map((data: any) => {
      return {
        duration: formatDateShort(
          moment()
            .subtract(data.duration, 'weeks')
            .toDate()
        ),
        count: data.count
      };
    })
    .reverse();
};

const aggregateByMonth = (histories: any) => {
  const records = histories.filter((history: any) => history.type === RECORD);

  const months = records.reduce((result: any, current: any) => {
    const monthsFromToday = moment(current.timestamp.toDate()).diff(
      moment(),
      'months'
    );

    const element = result.find((p: any) => {
      return p.duration === monthsFromToday;
    });

    if (element) {
      element.count++;
    } else {
      result.push({
        duration: monthsFromToday,
        count: 1
      });
    }
    return result;
  }, []);

  return months
    .map((data: any) => {
      return {
        duration: formatYearMonth(
          moment()
            .subtract(data.duration, 'months')
            .toDate()
        ),
        count: data.count
      };
    })
    .reverse();
};

const aggregateMinutesByMonth = (histories: any) => {
  const months = histories.reduce((result: any, current: any) => {
    const monthsFromToday = moment(current.timestamp.toDate()).diff(
      moment(),
      'months'
    );

    const element = result.find((p: any) => {
      return p.duration === monthsFromToday;
    });

    if (element) {
      element.count = element.count + current.minutes;
    } else {
      result.push({
        duration: monthsFromToday,
        count: current.minutes
      });
    }
    return result;
  }, []);

  return months
    .map((data: any) => {
      return {
        duration: formatYearMonth(
          moment()
            .subtract(data.duration, 'months')
            .toDate()
        ),
        minutes: data.count
      };
    })
    .reverse();
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
  const challengeResults = summerizeChallenges(challenges, categoryId);

  const recordTimezones = aggregateTimezone(histories);
  const recordDaysOfTheWeek = aggregateDayOfTheWeek(histories);
  const recordAccWeeks = aggregateByWeek(histories);
  const recordAccMonths = aggregateByMonth(histories);
  const minutesByMonths = aggregateMinutesByMonth(histories);
  const totalMinutes = histories
    .filter((history: any) => history)
    .reduce((p: any, x: any) => {
      if (x.minutes) {
        return p + x.minutes;
      } else {
        return p;
      }
    }, 0);
  const totalMinutesMessage = `実施時間合計: ${Math.floor(
    totalMinutes / 60
  ).toString()}時間${(totalMinutes % 60).toString()}分`;

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
      recordAccWeeks,
      recordAccMonths,
      challenges: challengeResults,
      recordTimezones,
      recordDaysOfTheWeek,
      minutesByMonths,
      totalMinutesMessage
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
