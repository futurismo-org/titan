import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileChallenges } from '~/actions/profileAction';
import { isChallengeOpening } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchProfileChallenges
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const userShortId = profile.shortId;

  const resourceId = `/profiles/${userShortId}/challenges`;
  const challenges = state.profile.items
    .filter((challenge: any) => {
      if (!challenge.openedAt) return false;
      if (!challenge.closedAt) return false;

      return isChallengeOpening(
        challenge.openedAt.toDate(),
        challenge.closedAt.toDate()
      );
    })
    .filter((challenge: any) => !challenge.freezed);

  return {
    loading: state.challenge.loading,
    error: state.challenge.error,
    resourceId,
    challenges,
    userShortId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
