import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchParticipant } from '~/actions/participantAction';
import { fetchUserTopics } from '~/actions/topicAction';
import { getParticipantId, getTopicsId } from '~/lib/resource';

import moment from '~/lib/moment';
import {
  NOTE_TYPE_JOIN,
  NOTE_TYPE_OPEN,
  NOTE_TYPE_CLOSE,
  NOTE_TYPE_RECORD,
  NOTE_TYPE_RESET,
  NOTE_TYPE_TOPIC
} from '~/constants/note';
import { RECORD } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipant, fetchUserTopics }, dispatch);

const generateNotes = (
  challenge: any,
  user: any,
  participant: any,
  topics: any
) => {
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

  participant.histories.map((history: any) => {
    const type = history.type === RECORD ? NOTE_TYPE_RECORD : NOTE_TYPE_RESET;

    notes.push({
      id: shortId.generate(),
      type,
      timestamp: history.timestamp,
      data: {
        timpstamp: history.timestamp,
        days: history.days
      }
    });

    return false;
  });

  topics.map((topic: any) => {
    notes.push({
      id: shortId.generate(),
      type: NOTE_TYPE_TOPIC,
      timestamp: topic.createdAt.toDate(),
      data: {
        timpstamp: topic.createdAt.toDate(),
        path: `/c/${challenge.id}/t/${topic.id}`,
        title: topic.title
      }
    });

    return false;
  });

  return notes.sort((x: any, y: any) =>
    moment(x.timestamp).diff(moment(y.timestamp))
  );
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const userShortId = user.shortId;

  const resourceId = getParticipantId(challengeId, userShortId);
  const topicsResourceId = getTopicsId('challenges', challenge.id);

  const participant = state.participant.target;
  const topics = state.topic.items;

  const notes =
    challenge &&
    user &&
    participant &&
    topics &&
    generateNotes(challenge, user, participant, topics);

  return {
    resourceId,
    topicsResourceId,
    notes,
    userShortId,
    loading: state.participant.loading || state.topic.loading,
    error: state.participant.error || state.topic.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
