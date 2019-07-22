import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import {
  fetchCategoriesWithRefs,
  resetCategoryInfo
} from '~/actions/categoryAction';
import { fetchChallenge, resetChallengeInfo } from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchCategory: fetchCategoriesWithRefs,
      fetchChallenge: fetchChallenge,
      resetChallengeInfo,
      resetCategoryInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.match.params.id;
  const resourceId = `/challenges/${challengeId}`;

  const challenge = state.challenge.target;
  const categoryRef = challenge && challenge.categoryRef;

  return {
    challenge,
    categoryRef: categoryRef ? [categoryRef] : null,
    category: state.category.items[0],
    loading: state.category.loading || state.challenge.loading,
    error: state.category.error || state.challenge.error,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
