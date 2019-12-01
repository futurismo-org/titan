import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { showSensitive, hideSensitive } from '~/actions/sensitiveAction';
import { isChallengeOpening } from '~/lib/challenge';
import { isLogin } from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      showSensitive,
      hideSensitive
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challenges =
    isLoaded(state.firestore.ordered.challenges) &&
    state.firestore.ordered.challenges
      .filter(
        (challenge: any) =>
          !challenge.draft &&
          !challenge.freezed &&
          !challenge.sensitive &&
          !challenge.ios && // みための統一のためAndroidも含めてDashbardでは表示しない。
          isChallengeOpening(
            challenge.openedAt.toDate(),
            challenge.closedAt.toDate()
          )
      )
      .slice(0, 4);

  const categories =
    isLoaded(state.firestore.ordered.categories) &&
    state.firestore.ordered.categories
      .filter(
        (category: any) =>
          !category.freezed && !category.sensitive && !category.ios // みための統一のためAndroidも含めてDashbardでは表示しない。
      )
      .slice(0, 6);

  return {
    challenges,
    categories,
    debugSensitive: state.sensitive && state.sensitive.show,
    isLogin: isLogin(state),
    ...props
  };
};

const queries = (props: any) => [
  {
    collection: 'challenges',
    orderByKey: ['updatedAt', 'desc']
  },
  {
    collection: 'categories',
    orderByKey: ['updatedAt', 'desc'],
    limit: 12
  }
];

export default compose(
  firestoreConnect(queries),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
) as any;
