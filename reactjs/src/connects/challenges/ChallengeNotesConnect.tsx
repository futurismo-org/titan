import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchParticipant } from '~/actions/participantAction';
import { fetchUserTopics } from '~/actions/topicAction';
import { getParticipantId, getTopicsId, getNotesId } from '~/lib/resource';
import { fetchUserNotes } from '~/actions/noteAction';

import moment from '~/lib/moment';
import {
  POST_TYPE_JOIN,
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_TOPIC,
  POST_TYPE_NOTE,
  POST_TYPE_SUCCESS,
  POST_TYPE_ANALYSIS
} from '~/constants/post';
import { RECORD } from '~/lib/challenge';
import { getUserChallengeNotes } from '~/lib/getstream';
import { createPost } from '~/lib/post';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { fetchParticipant, fetchUserTopics, fetchUserNotes },
    dispatch
  );

const generatePosts = (data: any, challenge: any) => {
  const notes = [];

  notes.push({
    id: shortId.generate(),
    type: POST_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });

  notes.push({
    id: shortId.generate(),
    type: POST_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  data.map((post: any) => notes.push(createPost(post)));

  return notes;
};

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
    type: POST_TYPE_JOIN,
    timestamp: createdAt,
    data: {
      createdAt
    }
  });

  notes.push({
    id: shortId.generate(),
    type: POST_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });

  notes.push({
    id: shortId.generate(),
    type: POST_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  participant.histories.map((history: any) => {
    const type = history.type === RECORD ? POST_TYPE_RECORD : POST_TYPE_RESET;

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
      type: POST_TYPE_TOPIC,
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
      type: post.type || POST_TYPE_NOTE,
      timestamp: post.createdAt.toDate(),
      data: {
        id: post.id,
        challengeId: challenge.id,
        noteId: post.id,
        timestamp: post.createdAt.toDate(),
        text: post.text,
        type: post.type || POST_TYPE_NOTE
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

  // const resourceId = getParticipantId(challengeId, userShortId);
  // const topicsResourceId = getTopicsId('challenges', challenge.id);
  // const notesResourceId = getNotesId(challenge.id);

  // const participant = state.participant.target;
  // const topics = state.topic.items;
  // const posts = state.note.items;

  // const notes =
  //   challenge &&
  //   user &&
  //   participant &&
  //   topics &&
  //   posts &&
  //   generateNotes(challenge, user, participant, topics, posts);

  // const successList =
  //   notes && notes.filter(note => note.type === POST_TYPE_SUCCESS);
  // const analysisList =
  //   notes && notes.filter(note => note.type === POST_TYPE_ANALYSIS);

  const profile = state.firebase.profile;
  const isMyProfile = (userShortId: string) => profile.shortId === userShortId;

  const feedNotes = () =>
    getUserChallengeNotes(profile.shortId, { challengeId })
      .then((data: any) => generatePosts(data, challenge))
      .then((posts: any) =>
        posts.sort((x: any, y: any) =>
          moment(x.timestamp).diff(moment(y.timestamp))
        )
      );

  return {
    userShortId,
    isMyProfile,
    feedNotes,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
