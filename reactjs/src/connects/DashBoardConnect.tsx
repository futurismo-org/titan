import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  fetchChallenges,
  fetchPinnedChallenges,
  resetChallengeInfo
} from '~/actions/challengeAction';
import { fetchCategories, resetCategoryInfo } from '~/actions/categoryAction';
import { showSensitive, hideSensitive } from '~/actions/sensitiveAction';
import { isChallengeOpening, isChallengeWillOpen } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenges,
      fetchCategories,
      fetchPinnedChallenges,
      resetChallengeInfo,
      resetCategoryInfo,
      showSensitive,
      hideSensitive
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challenges = state.challenge.items.filter(
    (challenge: any) =>
      !challenge.freezed &&
      (isChallengeOpening(
        challenge.openedAt.toDate(),
        challenge.closedAt.toDate()
      ) ||
        isChallengeWillOpen(challenge.openedAt.toDate(), 7))
  );

  return {
    challenges,
    categories: state.category.items.filter(
      (category: any) => !category.freezed
    ),
    // pinned: state.challenge.pinned.filter((pinned: any) => !pinned.freezed),
    debugSensitive: state.sensitive && state.sensitive.show,
    isLogin: !state.firebase.profile.isEmpty && state.firebase.profile.isLoaded,
    loading:
      state.challenge.loading ||
      state.category.loading ||
      state.challenge.loadingSub,
    error:
      state.challenge.error || state.category.error || state.challenge.errorSub,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
