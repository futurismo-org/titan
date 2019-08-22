import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchParticipant } from '~/actions/participantAction';
import { getParticipantId } from '~/lib/resource';

import moment from '~/lib/moment';
import {
  NOTE_TYPE_JOIN,
  NOTE_TYPE_OPEN,
  NOTE_TYPE_CLOSE
} from '~/constants/note';

const generateNotes = (challenge: any, user: any, participant: any) => {
  const notes = [];
  const startedAt = participant.startedAt.toDate();

  notes.push({
    id: shortId.generate(),
    type: NOTE_TYPE_JOIN,
    timestamp: startedAt,
    data: {
      startedAt
    }
  });
  notes.push({
    id: shortId.generate(),
    type: NOTE_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });
  notes.push({
    id: shortId.generate(),
    type: NOTE_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  return notes.sort((x: any, y: any) =>
    moment(x.timestamp).diff(moment(y.timestamp))
  );
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipant }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const userShortId = user.shortId;

  const resourceId = getParticipantId(challengeId, userShortId);

  const participant = state.participant.target;

  const notes =
    challenge &&
    user &&
    participant &&
    generateNotes(challenge, user, participant);

  return {
    resourceId,
    notes,
    loading: state.participant.loading,
    error: state.participant.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
