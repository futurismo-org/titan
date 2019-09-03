import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { showSensitive, hideSensitive } from '~/actions/sensitiveAction';
import { isChallengeOpening, isChallengeWillOpen } from '~/lib/challenge';
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
    isLoaded(state.firestore.data.challenges) &&
    Object.values(state.firestore.data.challenges).filter(
      (challenge: any) =>
        !challenge.freezed &&
        !challenge.sensitive &&
        (isChallengeOpening(
          challenge.openedAt.toDate(),
          challenge.closedAt.toDate()
        ) ||
          isChallengeWillOpen(challenge.openedAt.toDate(), 7))
    );

  const categories =
    isLoaded(state.firestore.data.categories) &&
    Object.values(state.firestore.data.categories).filter(
      (category: any) => !category.freezed && !category.sensitive
    );

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
    orderByKey: ['updatedAt', 'desc'],
    limit: 6
  },
  {
    collection: 'categories',
    orderByKey: ['updatedAt', 'desc'],
    limit: 6
  }
];

export default compose(
  firestoreConnect(queries),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
) as any;
