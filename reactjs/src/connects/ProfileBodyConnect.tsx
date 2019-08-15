import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileChallenges } from '~/actions/challengeAction';
import { fetchProfileCategories } from '~/actions/categoryAction';
import { isChallengeClosed } from '~/lib/challenge';

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

  const currentChallenges = challenges.filter(
    (item: any) => !isChallengeClosed(item.closedAt.toDate())
  );

  const pastChallenges = challenges.filter((item: any) =>
    isChallengeClosed(item.closedAt.toDate())
  );

  return {
    loading: state.challenge.loading || state.category.loading,
    error: state.challenge.error || state.category.error,
    currentChallenges,
    pastChallenges,
    categories,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
