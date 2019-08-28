import stream from 'getstream';
import axios from '~/lib/axios';

import firebase from '~/lib/firebase';
import { POST_TYPE_JOIN } from '~/constants/post';

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

const getUserToken = (userId: string) => {
  return axios
    .post(
      '/getstream/token/user',
      {
        userId: userId
      },
      { headers: { Accept: 'application/json' } }
    )
    .then(res => res.data);
};

const getTimelineToken = () => {
  return axios
    .post('/getstream/token/timeline', {
      headers: { Accept: 'application/json' }
    })
    .then(res => res.data);
};

// チャレンジ参加
export const postChallengeJoin = (
  userId: string,
  userShortId: string,
  props: any
) => {
  const { challengeId, user } = props;

  return getClient(userId).then((client: any) => {
    if (!client) return;

    const feed = client.feed('user', userShortId);
    feed.addActivity({
      actor: streamUserId(userShortId),
      verb: POST_TYPE_JOIN,
      object: `user:${userShortId}`,
      foreign_id: `challenge:${challengeId}`, // eslint-disable-line
      time: new Date(),
      createdAt: new Date(),
      userId: userShortId,
      userDisplayName: user.displayName,
      userPhoroURL: user.photoURL,
      challengeId
    });
  });
};

export const getUserChallengeNotes = (userShortId: string, props: any) => {
  const { challengeId } = props;
  const client = stream.connect(GETSTREAM_KEY, null, GETSTREAM_APP_ID);

  console.log(userShortId);

  return getUserToken(userShortId).then((token: any) => {
    const postFeed = client.feed('user', userShortId, token);
    return postFeed.get({}).then((data: any) => data['results']);
  });
};
