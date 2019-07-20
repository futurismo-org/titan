import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  fetchChallenges,
  fetchPinnedChallenges
} from '~/actions/challengeAction';
import { fetchCategories } from '~/actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenges: fetchChallenges,
      fetchCategories: fetchCategories,
      fetchPinnedChallenges: fetchPinnedChallenges
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => ({
  challenges: state.challenge.items,
  categories: state.category.items,
  pinned: state.challenge.pinned,
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