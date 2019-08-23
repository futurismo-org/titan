import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchChallenge } from '~/actions/challengeAction';
import { fetchParticipantJoined } from '~/actions/participantAction';
import { getParticipantId } from '~/lib/resource';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenge,
      fetchParticipantJoined
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.match.params.id;
  const resourceId = `/challenges/${challengeId}`;

  const { profile } = state.firebase;
  const userShortId = profile.shortId;

  const participantResourceId = getParticipantId(challengeId, userShortId);

  const challenge = state.challenge.target;

  const isLogin = !profile.isEmpty && profile.isLoaded;

  return {
    challenge,
    participantResourceId,
    isLogin,
    resourceId,
    userShortId,
    join: state.participant.exist,
    loading: state.category.loading || state.challenge.loading,
    error: state.category.error || state.challenge.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
