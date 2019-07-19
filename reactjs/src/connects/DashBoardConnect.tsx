import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchChallenges } from 'actions/challengeAction';
import { fetchCategories } from 'actions/categoryAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenges: fetchChallenges,
      fetchCategories: fetchCategories
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => ({
  challenges: state.challenge.items,
  categories: state.category.items,
  loading: state.challenge.loading || state.category.loading,
  error: state.challenge.error || state.category.error,
  ...props
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
