import stream from 'getstream';
import {
  POST_TYPE_OBJECTIVE,
  POST_TYPE_TOPIC,
  POST_TYPE_JOIN
} from '../constants/post';

import axios from '~/lib/axios';

import { getTopicPath } from './url';
import { toISOLocalString } from '~/lib/moment';

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

export const GETSTREAM_KEY =
  process.env.REACT_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development' ||
  process.env.APP_ENV === 'development'
    ? (process.env.REACT_APP_GETSTREAM_KEY_DEVELOPMENT as string)
    : (process.env.REACT_APP_GETSTREAM_KEY_PRODUCTION as string);

export const GETSTREAM_APP_ID =
  process.env.REACT_APP_ENV === 'development' ||
  process.env.NODE_ENV === 'development' ||
  process.env.APP_ENV === 'development'
    ? (process.env.REACT_APP_GETSTREAM_APP_ID_DEVELOPMENT as string)
    : (process.env.REACT_APP_GETSTREAM_APP_ID_PRODUCTION as string);

// const getClient = (userId: string) => {
//   return firebase
//     .firestore()
//     .collection('securities')
//     .doc(userId)
//     .get()
//     .then((doc: any) => (doc.data() ? doc.data().getStreamToken : null))
//     .then((token: string) =>
//       token ? stream.connect(GETSTREAM_KEY, token, GETSTREAM_APP_ID) : null
//     );
// };

// const getHistoryClient = (userShortId: string) => {
//   return axios
//     .post(
//       '/getstream/token',
//       {
//         userId: userShortId
//       },
//       { headers: { Accept: 'application/json' } }
//     )
//     .then(res => res.data)
//     .then((token: string) =>
//       token ? stream.connect(GETSTREAM_KEY, token, GETSTREAM_APP_ID) : null
//     );
// };

export const getToken = (userShortId: string) => {
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

// const collectionName = (collectionType: string) => {
//   if (collectionType === 'challenges') {
//     return 'challenge';
//   } else if (collectionType === 'categories') {
//     return 'category';
//   } else {
//     return 'general';
//   }
// };

const getUserChallengeId = (userShortId: string, challengeId: string) =>
  `${userShortId}_${challengeId}`;

// チャレンジ参加
export const postUserChallengeJoin = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { user } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  const id = getUserChallengeId(userShortId, challengeId);

  return getToken(id).then((token: any) => {
    const feed = client.feed('challenge', id, token);

    feed.addActivity({
      actor: streamUserId(id),
      verb: POST_TYPE_JOIN,
      object: `challenge:${id}`,
      foreign_id: `challenge:${id}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      challengeId
    });
  });
};

// トピック投稿
export const postUserChallengeTopic = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { topicId, title, user } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  const id = getUserChallengeId(userShortId, challengeId);

  return getToken(id).then((token: any) => {
    const feed = client.feed('topic', id, token);
    feed.addActivity({
      actor: streamUserId(id),
      verb: POST_TYPE_TOPIC,
      object: `topic:${topicId}`,
      foreign_id: `topic:${topicId}`, //eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      collectionId: challengeId,
      collectionType: 'challenges',
      title,
      path: getTopicPath(topicId, 'challenges', challengeId),
      topicId,
      challengeId
    });
  });
};

// 記録投稿
export const postUserChallengeHistory = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { historyId, user, type, days } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  const id = getUserChallengeId(userShortId, challengeId);

  return getToken(id).then((token: any) => {
    const feed = client.feed('history', id, token);
    feed.addActivity({
      actor: streamUserId(id),
      verb: type,
      object: `history:${historyId}`,
      foreign_id: `history:${historyId}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      historyId,
      challengeId,
      days
    });
  });
};

// ノート投稿
export const postUserChallengeNote = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { noteId, user, type, text } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  const id = getUserChallengeId(userShortId, challengeId);

  return getToken(id).then((token: any) => {
    const feed = client.feed('note', id, token);
    feed.addActivity({
      actor: streamUserId(id),
      verb: type,
      object: `note:${noteId}`,
      foreign_id: `note:${noteId}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      noteId,
      challengeId,
      text
    });
  });
};

// ノート編集
export const updateUserChallengeNote = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { rawData, type, text } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  const id = getUserChallengeId(userShortId, challengeId);

  const activity = {
    ...rawData,
    text,
    actor: streamUserId(id),
    verb: type,
    time: new Date().toISOString()
  };
  return getToken(id).then((token: string) => {
    const feed = client.feed('note', id, token);
    feed.addActivity(activity);
  });
};

// ノート削除
export const deleteUserChallengeNote = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { serverId } = props;
  const id = getUserChallengeId(userShortId, challengeId);

  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  return getToken(id).then((token: string) => {
    const feed = client.feed('note', id, token);
    feed.removeActivity(serverId);
  });
};

// 目標投稿
export const postUserChallengeObjective = (
  userShortId: string,
  challengeId: string,
  props: any
) => {
  const { user, days, what } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);
  const objectiveId = challengeId;
  const id = getUserChallengeId(userShortId, challengeId);

  return getToken(id).then((token: any) => {
    const feed = client.feed('objective', id, token);
    feed.addActivity({
      actor: streamUserId(id),
      verb: POST_TYPE_OBJECTIVE,
      object: `objective:${objectiveId}`,
      foreign_id: `objective:${objectiveId}`, // eslint-disable-line
      time: new Date().toISOString(),
      createdAt: toISOLocalString(new Date()),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      objectiveId,
      challengeId,
      days,
      what
    });
  });
};

export const followUserChallengeTimeline = (
  userShortId: string,
  challengeId: string
) => {
  const id = getUserChallengeId(userShortId, challengeId);
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  getToken(id).then((token: any) => {
    const timeline = client.feed('timeline', id, token);
    timeline.follow('challenge', id);
    timeline.follow('topic', id);
    timeline.follow('note', id);
    timeline.follow('history', id);
    timeline.follow('objective', id);
  });

  getToken(challengeId).then((token: any) => {
    const timeline = client.feed('timeline', id, token);
    timeline.follow('challenge', id);
    timeline.follow('topic', id);
    timeline.follow('note', id);
    timeline.follow('history', id);
    timeline.follow('objective', id);
  });

  getToken(userShortId).then((token: any) => {
    const timeline = client.feed('timeline', id, token);
    timeline.follow('challenge', id);
    timeline.follow('topic', id);
    timeline.follow('note', id);
    timeline.follow('history', id);
    timeline.follow('objective', id);
  });

  getToken(userShortId).then((token: any) => {
    const timeline = client.feed('timeline', userShortId, token);
    timeline.follow('timeline', id);
  });

  getToken(challengeId).then((token: any) => {
    const timeline = client.feed('timeline', challengeId, token);
    timeline.follow('timeline', id);
  });

  getToken(challengeId).then((token: any) => {
    const objective = client.feed('objective', challengeId, token);
    objective.follow('objective', id);
  });
};

export const getUserChallengeTimeline = (
  userShortId: string,
  challengeId: string
) => {
  const id = getUserChallengeId(userShortId, challengeId);
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  return getToken(id).then((token: any) => {
    const timeline = client.feed('timeline', id, token);
    return timeline.get({ limit: 100 }).then((data: any) => data['results']);
  });
};

export const getChallengeTimeline = (challengeId: string) => {
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  return getToken(challengeId).then((token: any) => {
    const timeline = client.feed('timeline', challengeId, token);
    return timeline.get({ limit: 100 }).then((data: any) => data['results']);
  });
};

export const getChallengeObjectives = (challengeId: string) => {
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  return getToken(challengeId).then((token: any) => {
    const timeline = client.feed('objective', challengeId, token);
    return timeline.get({ limit: 100 }).then((data: any) => data['results']);
  });
};
