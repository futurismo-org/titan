import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchCategory, resetCategoryInfo } from '~/actions/categoryAction';
import {
  fetchChallengesWithRefs,
  resetChallengeInfo
} from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory: fetchCategory,
      fetchChallenges: fetchChallengesWithRefs,
      resetCategoryInfo,
      resetChallengeInfo
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
    loading: state.category.loading || state.challenge.loading,
    error: state.category.error || state.challenge.error,
    resourceId,
    challengeRefs,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
