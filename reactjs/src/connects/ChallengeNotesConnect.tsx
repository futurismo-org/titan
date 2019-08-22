import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipant } from '~/actions/participantAction';
import { getParticipantId } from '~/lib/resource';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipant }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const userShortId = user.shortId;

  const resourceId = getParticipantId(challengeId, userShortId);

  const participant = state.participant.target;
  const startedAt = participant && participant.startedAt.toDate();

  return {
    resourceId,
    startedAt,
    loading: state.participant.loading,
    error: state.participant.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
