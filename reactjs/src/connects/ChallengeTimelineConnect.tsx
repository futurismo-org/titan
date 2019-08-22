import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchTopics } from '~/actions/topicAction';
import { fetchNotes } from '~/actions/noteAction';
import { getTopicsId, getNotesId } from '~/lib/resource';

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
  bindActionCreators({ fetchTopics, fetchNotes }, dispatch);

const generateItems = (
  challenge: any,
  // user: any,
  // participant: any,
  topics: any,
  posts: any
) => {
  const items = [] as any[];
  items.push({
    id: shortId.generate(),
    type: NOTE_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });

  items.push({
    id: shortId.generate(),
    type: NOTE_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  // const startedAt = participant.startedAt.toDate();

  // items.push({
  //   id: shortId.generate(),
  //   type: NOTE_TYPE_JOIN,
  //   timestamp: startedAt,
  //   data: {
  //     startedAt
  //   }
  // });

  // participant.histories.map((history: any) => {
  //   const type = history.type === RECORD ? NOTE_TYPE_RECORD : NOTE_TYPE_RESET;

  //   items.push({
  //     id: shortId.generate(),
  //     type,
  //     timestamp: history.timestamp.toDate(),
  //     data: {
  //       timestamp: history.timestamp.toDate(),
  //       days: history.days
  //     }
  //   });

  //   return false;
  // });

  topics.map((topic: any) => {
    items.push({
      id: shortId.generate(),
      type: NOTE_TYPE_TOPIC,
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
      type: post.type || NOTE_TYPE_DEFAULT,
      timestamp: post.createdAt.toDate(),
      data: {
        id: post.id,
        challengeId: challenge.id,
        noteId: post.id,
        timestamp: post.createdAt.toDate(),
        text: post.text,
        type: post.type || NOTE_TYPE_DEFAULT,
        userName: post.userName,
        userPhotoURL: post.userPhotoURL,
        userId: post.userId
      }
    });

    return false;
  });

  return items.sort((x: any, y: any) =>
    moment(y.timestamp).diff(moment(x.timestamp))
  );
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;

  // const resourceId = getParticipantId(challengeId, userShortId);
  const topicsResourceId = getTopicsId('challenges', challenge.id);
  const notesResourceId = getNotesId(challenge.id);

  // const participant = state.participant.target;
  const topics = state.topic.items;
  const posts = state.note.items;

  const items =
    challenge &&
    // user &&
    // participant &&
    topics &&
    posts &&
    generateItems(challenge, topics, posts);

  return {
    items,
    topicsResourceId,
    notesResourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
