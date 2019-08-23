import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchParticipant } from '~/actions/participantAction';
import { fetchUserTopics } from '~/actions/topicAction';
import { getParticipantId, getTopicsId, getNotesId } from '~/lib/resource';
import { fetchUserNotes } from '~/actions/noteAction';

import moment from '~/lib/moment';
import {
  NOTE_TYPE_JOIN,
  NOTE_TYPE_OPEN,
  NOTE_TYPE_CLOSE,
  NOTE_TYPE_RECORD,
  NOTE_TYPE_RESET,
  NOTE_TYPE_TOPIC,
  NOTE_TYPE_DEFAULT,
  NOTE_TYPE_SUCCESS,
  NOTE_TYPE_ANALYSIS
} from '~/constants/note';
import { RECORD } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { fetchParticipant, fetchUserTopics, fetchUserNotes },
    dispatch
  );

const generateNotes = (
  challenge: any,
  user: any,
  participant: any,
  topics: any,
  posts: any
) => {
  const notes = [];
  const createdAt = participant.createdAt.toDate();

  notes.push({
    id: shortId.generate(),
    type: NOTE_TYPE_JOIN,
    timestamp: createdAt,
    data: {
      createdAt
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
      timestamp: history.timestamp.toDate(),
      data: {
        timestamp: history.timestamp.toDate(),
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
        timestamp: topic.createdAt.toDate(),
        path: `/c/${challenge.id}/t/${topic.id}`,
        title: topic.title
      }
    });

    return false;
  });

  posts.map((post: any) => {
    notes.push({
      id: shortId.generate(),
      type: post.type || NOTE_TYPE_DEFAULT,
      timestamp: post.createdAt.toDate(),
      data: {
        id: post.id,
        challengeId: challenge.id,
        noteId: post.id,
        timestamp: post.createdAt.toDate(),
        text: post.text,
        type: post.type || NOTE_TYPE_DEFAULT
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
  const notesResourceId = getNotesId(challenge.id);

  const participant = state.participant.target;
  const topics = state.topic.items;
  const posts = state.note.items;

  const notes =
    challenge &&
    user &&
    participant &&
    topics &&
    posts &&
    generateNotes(challenge, user, participant, topics, posts);

  const successList =
    notes && notes.filter(note => note.type === NOTE_TYPE_SUCCESS);
  const analysisList =
    notes && notes.filter(note => note.type === NOTE_TYPE_ANALYSIS);

  const profile = state.firebase.profile;
  const isMyProfile = (userShortId: string) => profile.shortId === userShortId;

  return {
    resourceId,
    topicsResourceId,
    notes,
    successList,
    analysisList,
    userShortId,
    notesResourceId,
    isMyProfile,
    loading:
      state.participant.loading || state.topic.loading || state.note.loading,
    error: state.participant.error || state.topic.error || state.note.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
