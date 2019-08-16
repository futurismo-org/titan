import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileCategory } from '~/actions/profileAction';
import { fetchCategory } from '~/actions/categoryAction';
import { formatDatetime } from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory,
      fetchProfileCategory
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const categoryId = props.match.params.categoryId;

  // const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  // const profileChallengesResourceId = `/profiles/${userShortId}/challenges`;
  // const categoryResourceId = `/categories/${categoryId}`;

  // const fetchHistories = async () => {
  //   const category = await firebase
  //     .firestore()
  //     .doc(categoryResourceId)
  //     .get()
  //     .then((doc: any) => doc.data());

  //   const currentChallengeIds = await firebase
  //     .firestore()
  //     .collection(profileChallengesResourceId)
  //     .get()
  //     .then((snap: any) => snap.docs.map((doc: any) => doc.id));

  //   const currentCategoryChallengeIds = await currentChallengeIds.filter(
  //     (id: string) => id === category.id
  //   );

  //   const challengeHistoies = await currentCategoryChallengeIds
  //     .map(async (id: any) => {
  //       const resourceId = `/challenges/${id}/participants/${userShortId}`;
  //       const histories = await firebase
  //         .firestore()
  //         .doc(resourceId)
  //         .get()
  //         .then((doc: any) => doc.data().histories);
  //       return histories;
  //     })
  //     .reduce((x: any, y: any) => {
  //       return x.concat(y);
  //     }, []);

  //   const profileHistoies = await firebase
  //     .firestore()
  //     .doc(profileCategoryResourceId)
  //     .get()
  //     .then((doc: any) => doc.data().histories);

  //   const histories = await profileHistoies.concat(challengeHistoies);

  //   return histories;
  // };

  // const dataLazy = fetchHistories().then((histories: any) => {
  //   const sorted = histories.sort(
  //     (x: any, y: any) => x.timestamp.seconds - y.timestamp.seconds
  //   );

  //   let days = 0;
  //   let lastResetDate = new Date();
  //   for (let i = 0; i < sorted.length; i++) {
  //     if (sorted[i].type === 'RESET') {
  //       lastResetDate = sorted[i].timestamp.toDate();
  //       break;
  //     } else {
  //       days = days + 1;
  //     }
  //   }

  //   return {
  //     days,
  //     lastResetDate
  //   };
  // });

  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  const categoryResourceId = `/categories/${categoryId}`;

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
      myBest
    };
  } else {
    data = {};
  }

  return {
    data,
    metadata,
    loading: state.profile.loading || state.category.loading,
    error: state.profile.error || state.category.error,
    profileCategoryResourceId,
    categoryResourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
