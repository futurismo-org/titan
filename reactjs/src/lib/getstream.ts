import stream from 'getstream';
import { POST_TYPE_TOPIC, POST_TYPE_JOIN } from '../constants/post';
import axios from '~/lib/axios';

import firebase from '~/lib/firebase';
import { getTopicPath } from './url';
import moment, { toISOLocalString } from '~/lib/moment';

const streamUserId = (userId: string) => `SU:${userId}`;

export const getStreamToken = async (userId: string) => {
  return await axios
    .post(
      '/getstream/register',
      {
        userId: userId
      },
      { headers: { Accept: 'application/json' } }
    )
    .then(res => res.data);
};

const GETSTREAM_KEY = process.env.REACT_APP_GETSTREAM_KEY as string;
const GETSTREAM_APP_ID = process.env.REACT_APP_GETSTREAM_APP_ID as string;

const getClient = (userId: string) => {
  return firebase
    .firestore()
    .collection('securities')
    .doc(userId)
    .get()
    .then((doc: any) => (doc.data() ? doc.data().getStreamToken : null))
    .then((token: string) =>
      token ? stream.connect(GETSTREAM_KEY, token, GETSTREAM_APP_ID) : null
    );
};

const getToken = (userShortId: string) => {
  return axios
    .post(
      '/getstream/token',
      {
        userId: userShortId
      },
      { headers: { Accept: 'application/json' } }
    )
    .then(res => res.data);
};

const getUserToken = (userShortId: string) => {
  return axios
    .post(
      '/getstream/token/user',
      {
        userId: userShortId
      },
      { headers: { Accept: 'application/json' } }
    )
    .then(res => res.data);
};

const getTimelineToken = (userShortId: string) => {
  return axios
    .post(
      '/getstream/token/timeline',
      {
        userId: userShortId
      },

      {
        headers: { Accept: 'application/json' }
      }
    )
    .then(res => res.data);
};

const collectionName = (collectionType: string) => {
  if (collectionType === 'challenges') {
    return 'challenge';
  } else if (collectionType === 'categories') {
    return 'category';
  } else {
    return 'general';
  }
};

// チャレンジ参加
export const postChallengeJoin = (userShortId: string, props: any) => {
  const { challengeId, user } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  return getToken(userShortId).then((token: any) => {
    const feed = client.feed('challenge', userShortId, token);
    feed.addActivity({
      actor: streamUserId(userShortId),
      verb: POST_TYPE_JOIN,
      object: `challenge:${challengeId}`,
      foreign_id: `challenge:${challengeId}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhoroURL: user.photoURL,
      challengeId
    });
  });
};

// トピック投稿
export const postTopic = (userId: string, userShortId: string, props: any) => {
  const {
    collectionType,
    collectionId,
    topicId,
    title,
    user,
    challengeId
  } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  return getToken(userShortId).then((token: any) => {
    const feed = client.feed('topic', userShortId, token);
    feed.addActivity({
      actor: streamUserId(userShortId),
      verb: POST_TYPE_TOPIC,
      object: `topic:${topicId}`,
      foreign_id: `${collectionName(collectionType)}:${collectionId}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhoroURL: user.photoURL,
      collectionId,
      collectionType,
      title,
      path: getTopicPath(topicId, collectionType, collectionId),
      topicId,
      challengeId
    });
  });
};

// 記録投稿
export const postHistory = (userShortId: string, props: any) => {
  const {
    collectionType,
    collectionId,
    historyId,
    user,
    challengeId,
    type
  } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  return getToken(userShortId).then((token: any) => {
    const feed = client.feed('history', userShortId, token);
    feed.addActivity({
      actor: streamUserId(userShortId),
      verb: type,
      object: `history:${historyId}`,
      foreign_id: `${collectionName(collectionType)}:${collectionId}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhoroURL: user.photoURL,
      collectionId,
      collectionType,
      historyId,
      challengeId
    });
  });
};

export const getUserChallengeNotes = (userShortId: string, props: any) => {
  const { challengeId } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  return getToken(userShortId).then((token: any) => {
    const timeline = client.feed('timeline', userShortId, token);
    timeline.follow('challenge', userShortId);
    timeline.follow('topic', userShortId);
    timeline.follow('note', userShortId);
    timeline.follow('objective', userShortId);

    return timeline
      .get({})
      .then((data: any) => data['results'])
      .then((posts: any) =>
        posts.filter((post: any) => post.challengeId === challengeId)
      );
  });
};
