import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  fetchChallenges,
  fetchPinnedChallenges,
  resetChallengeInfo
} from '~/actions/challengeAction';
import { fetchCategories, resetCategoryInfo } from '~/actions/categoryAction';
import { showSensitive, hideSensitive } from '~/actions/sensitiveAction';

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

const mapStateToProps = (state: any, props: any) => ({
  challenges: state.challenge.items,
  categories: state.category.items,
  pinned: state.challenge.pinned,
  debugSensitive: state.sensitive && state.sensitive.show,
  isLogin: !state.firebase.profile.isEmpty && state.firebase.profile.isLoaded,
  loading:
    state.challenge.loading ||
    state.category.loading ||
    state.challenge.loadingSub,
  error:
    state.challenge.error || state.category.error || state.challenge.errorSub,
  ...props
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
