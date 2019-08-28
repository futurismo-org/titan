import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchTopics } from '~/actions/topicAction';
import { fetchNotes } from '~/actions/noteAction';
import { fetchParticipants } from '~/actions/participantAction';
import { getTopicsId, getNotesId, getParticipantsId } from '~/lib/resource';

import moment, { isBeforeInDaysFromNow } from '~/lib/moment';
import {
  POST_TYPE_JOIN,
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_TOPIC,
  POST_TYPE_DEFAULT
} from '~/constants/post';
import { RECORD } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants, fetchTopics, fetchNotes }, dispatch);

const generateItems = (
  challenge: any,
  participants: any,
  topics: any,
  posts: any
) => {
  const items = [] as any[];
  items.push({
    id: shortId.generate(),
    type: POST_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });

  items.push({
    id: shortId.generate(),
    type: POST_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  participants.map((participant: any) => {
    const createdAt = participant.createdAt.toDate();

    items.push({
      id: shortId.generate(),
      type: POST_TYPE_JOIN,
      timestamp: createdAt,
      data: {
        createdAt,
        userName: participant.displayName,
        userPhotoURL: participant.photoURL,
        userId: participant.id
      }
    });

    participant.histories.map((history: any) => {
      const type = history.type === RECORD ? POST_TYPE_RECORD : POST_TYPE_RESET;

      items.push({
        id: shortId.generate(),
        type,
        timestamp: history.timestamp.toDate(),
        data: {
          timestamp: history.timestamp.toDate(),
          days: history.days,
          userName: participant.displayName,
          userPhotoURL: participant.photoURL,
          userId: participant.id
        }
      });

      return false;
    });

    return false;
  });

  topics.map((topic: any) => {
    items.push({
      id: shortId.generate(),
      type: POST_TYPE_TOPIC,
      timestamp: topic.createdAt.toDate(),
      data: {
        timestamp: topic.createdAt.toDate(),
        path: `/c/${challenge.id}/t/${topic.id}`,
        title: topic.title,
        userName: topic.userName,
        userPhotoURL: topic.userPhotoURL,
        userId: topic.userId
      }
    });

    return false;
  });

  posts.map((post: any) => {
    items.push({
      id: shortId.generate(),
      type: post.type || POST_TYPE_DEFAULT,
      timestamp: post.createdAt.toDate(),
      data: {
        id: post.id,
        challengeId: challenge.id,
        noteId: post.id,
        timestamp: post.createdAt.toDate(),
        text: post.text,
        type: post.type || POST_TYPE_DEFAULT,
        userName: post.userName,
        userPhotoURL: post.userPhotoURL,
        userId: post.userId
      }
    });

    return false;
  });

  return items
    .filter((item: any) => isBeforeInDaysFromNow(item.timestamp, 7))
    .sort((x: any, y: any) => moment(y.timestamp).diff(moment(x.timestamp)));
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;

  const participantsResourceId = getParticipantsId(challengeId);
  const topicsResourceId = getTopicsId('challenges', challengeId);
  const notesResourceId = getNotesId(challengeId);

  const participants = state.participant.items;
  const topics = state.topic.items;
  const posts = state.note.items;

  const items =
    challenge &&
    participants &&
    topics &&
    posts &&
    generateItems(challenge, participants, topics, posts);

  return {
    items,
    participantsResourceId,
    topicsResourceId,
    notesResourceId,
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
