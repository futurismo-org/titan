import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { fetchParticipantJoined } from '~/actions/participantAction';
import { getParticipantId } from '~/lib/resource';
import { isLogin, isReady, lazyEvalValue } from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchParticipantJoined
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.match.params.id;

  const { profile } = state.firebase;
  const userShortId = profile.shortId;
  const participantResourceId = getParticipantId(challengeId, userShortId);

  const challenge = lazyEvalValue(state.firestore.data.challenges, challengeId);

  return {
    challenge,
    participantResourceId,
    isLogin: isLogin(state),
    userShortId,
    join: state.participant.exist,
    loading: !isReady(challenge),
    ...props
  };
};

const mapFirestoreToState = (props: any) => {
  const challengeId = props.match.params.id;
  const resourceId = `challenges/${challengeId}`;

  return [resourceId];
};

export default compose(
  firestoreConnect(mapFirestoreToState),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
) as any;
