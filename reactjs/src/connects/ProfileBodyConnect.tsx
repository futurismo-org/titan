import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileChallenges } from '~/actions/challengeAction';
import { fetchProfileCategories } from '~/actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchProfileChallenges,
      fetchProfileCategories
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challenges = state.challenge.items;
  const categories = state.category.items;

  return {
    loading: state.challenge.loading || state.category.loading,
    error: state.challenge.error || state.category.error,
    challenges,
    categories,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
