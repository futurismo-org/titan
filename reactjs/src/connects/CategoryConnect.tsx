import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCategory } from '~/actions/categoryAction';
import { fetchChallengesWithRefs } from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory: fetchCategory,
      fetchChallenges: fetchChallengesWithRefs
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const categoryId = props.match.params.id;
  const resourceId = `/categories/${categoryId}`;

  const category = state.category.target;
  const challengeRefs = category && category.challengeRefs;

  return {
    category,
    challenges: state.challenge.items,
    loading: state.category.loading,
    resourceId,
    challengeRefs,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
