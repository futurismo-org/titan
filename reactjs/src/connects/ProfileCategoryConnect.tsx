import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileCategory } from '~/actions/profileAction';
import { fetchCategory } from '~/actions/categoryAction';
import { fetchHistories } from '~/actions/historyAction';
import moment, { formatDatetime } from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory,
      fetchProfileCategory,
      fetchHistories
    },
    dispatch
  );

const summerizeHistories = (histories: any) => {
  const summerized: any[] = [];

  let startHistory: any | null = null;
  let endHistory: any | null = null;
  let count = 1;

  histories.reverse().forEach((history: any) => {
    if (
      startHistory === null &&
      endHistory === null &&
      history.type === 'RECORD'
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
      return;
    }

    if (startHistory && endHistory) {
      const startDate = startHistory.timestamp.toDate();
      const endDate = endHistory.timestamp.toDate();
      const duration = moment.duration(moment(startDate).diff(endDate));

      const days = duration.asDays();
      const hours = duration.asHours() % 24;
      const minutes = duration.asMinutes() % 60;
      const durationMessage = `${days}日${hours}時間${minutes}分`;

      const record = {
        startDate,
        endDate,
        duration: durationMessage,
        attempt: count
      };

      summerized.push(record);

      startHistory = null;
      endHistory = null;
      count++;

      return;
    }
  });

  return summerized;
};

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const categoryId = props.match.params.categoryId;

  const categoryResourceId = `/categories/${categoryId}`;
  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  const profileCategoryHistoriesResourceId = `/profiles/${userShortId}/categories/${categoryId}/histories`;

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

  const histories = state.history.items;
  const summerized = summerizeHistories(histories);

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
      summerized
    };
  } else {
    data = {};
  }

  return {
    data,
    metadata,
    loading:
      state.profile.loading || state.category.loading || state.history.loading,
    error: state.profile.error || state.category.error || state.history.error,
    profileCategoryResourceId,
    profileCategoryHistoriesResourceId,
    categoryResourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
