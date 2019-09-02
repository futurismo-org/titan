import faker from 'faker';
import shortId from 'shortid';
import stream from 'getstream';

import {
  GETSTREAM_SECRET,
  GETSTREAM_APP_ID,
  GETSTREAM_KEY,
  DUMMY_TOPIC_ID_LIST,
  DUMMY_USER_ID_LIST,
  MUSCLE_CHALLENGE_ID,
  getRandomCreatedAt,
  DUMMY_NOTE_ID_LIST,
  TITAN_USER_SHORT_ID,
  TSUNE_USER_SHORT_ID
} from './common';

const client = stream.connect(
  GETSTREAM_KEY as string,
  GETSTREAM_SECRET as string,
  GETSTREAM_APP_ID as string
);

const streamUserId = (id: string) => `SU:${id}`;

export const POST_TYPE_JOIN = 'JOIN';
export const POST_TYPE_OPEN = 'OPEN';
export const POST_TYPE_CLOSE = 'CLOSE';
export const POST_TYPE_RECORD = 'RECORD';
export const POST_TYPE_RESET = 'RESET';
export const POST_TYPE_TOPIC = 'TOPIC';
export const POST_TYPE_NOTE = 'NOTE';
export const POST_TYPE_SUCCESS = 'SUCCESS';
export const POST_TYPE_ANALYSIS = 'ANALYSIS';
export const POST_TYPE_OBJECTIVE = 'OBJECTIVE';

const getUserChallengeId = (userShortId: string, challengeId: string) =>
  `${userShortId}_${challengeId}`;

const createTopics = () => {
  DUMMY_TOPIC_ID_LIST.map((topicId: string) => {
    const userId =
      DUMMY_USER_ID_LIST[
        faker.random.number({ min: 0, max: DUMMY_USER_ID_LIST.length - 1 })
      ];
    const challengeId = MUSCLE_CHALLENGE_ID;
    const id = getUserChallengeId(userId, challengeId);
    const feed = client.feed('topic', id);

    const activity = {
      actor: streamUserId(id),
      verb: POST_TYPE_TOPIC,
      object: `topic:${topicId}`,
      foreign_id: `topic:${topicId}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      createdAt: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: challengeId,
      topicId: topicId,
      title: faker.lorem.sentence(),
      path: `/c/${challengeId}/t/${topicId}`,
      challengeId,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar()
    };

    feed.addActivity(activity);
  });
};

const createNotes = () => {
  DUMMY_NOTE_ID_LIST.map((noteId: string) => {
    const userId =
      DUMMY_USER_ID_LIST[
        faker.random.number({ min: 0, max: DUMMY_USER_ID_LIST.length - 1 })
      ];

    const challengeId = MUSCLE_CHALLENGE_ID;
    const id = getUserChallengeId(userId, challengeId);
    const feed = client.feed('note', id);

    const activity = {
      actor: streamUserId(id),
      verb: POST_TYPE_NOTE,
      object: `note:${noteId}`,
      foreign_id: `note:${noteId}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      createdAt: getRandomCreatedAt().toISOString(),
      userId,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      noteId,
      text: faker.lorem.paragraphs(),
      challengeId
    };

    feed.addActivity(activity);
  });
};

const createHistories = () => {
  DUMMY_USER_ID_LIST.map(userId => {
    const historyId = shortId.generate();

    const challengeId = MUSCLE_CHALLENGE_ID;
    const id = getUserChallengeId(userId, challengeId);
    const feed = client.feed('history', id);

    const activity1 = {
      actor: streamUserId(id),
      verb: POST_TYPE_RESET,
      object: `history:${historyId}`,
      foreign_id: `history:${historyId}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      createdAt: getRandomCreatedAt().toISOString(),
      userId,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      historyId: historyId,
      challengeId,
      days: 0
    };

    const historyId2 = shortId.generate();
    const activity2 = {
      actor: streamUserId(id),
      verb: POST_TYPE_RECORD,
      object: `history:${historyId2}`,
      foreign_id: `history:${historyId2}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      createdAt: getRandomCreatedAt().toISOString(),
      userId,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      historyId: historyId2,
      challengeId,
      days: 3
    };

    feed.addActivities([activity1, activity2]);
  });
};

const createObjectives = () => {
  DUMMY_USER_ID_LIST.map(userId => {
    const objectiveId = MUSCLE_CHALLENGE_ID;
    const challengeId = MUSCLE_CHALLENGE_ID;
    const id = getUserChallengeId(userId, challengeId);
    const feed = client.feed('objective', id);

    const activity = {
      actor: streamUserId(id),
      verb: POST_TYPE_OBJECTIVE,
      object: `objective:${objectiveId}`,
      foreign_id: `objective:${objectiveId}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      createdAt: getRandomCreatedAt().toISOString(),
      userId,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      objectiveId,
      challengeId,
      what: '頑張りマンモス'
    };
    feed.addActivity(activity);
  });
};

const createRelationShip = (userShortId: string, challengeId: string) => {
  const id = getUserChallengeId(userShortId, challengeId);

  const follows = [
    { source: `timeline:${id}`, target: `challenge:${id}` },
    { source: `timeline:${id}`, target: `topic:${id}` },
    { source: `timeline:${id}`, target: `note:${id}` },
    { source: `timeline:${id}`, target: `history:${id}` },
    { source: `timeline:${id}`, target: `objective:${id}` },

    { source: `timeline:${userShortId}`, target: `challenge:${id}` },
    { source: `timeline:${userShortId}`, target: `topic:${id}` },
    { source: `timeline:${userShortId}`, target: `note:${id}` },
    { source: `timeline:${userShortId}`, target: `history:${id}` },
    { source: `timeline:${userShortId}`, target: `objective:${id}` },

    { source: `timeline:${challengeId}`, target: `challenge:${id}` },
    { source: `timeline:${challengeId}`, target: `topic:${id}` },
    { source: `timeline:${challengeId}`, target: `note:${id}` },
    { source: `timeline:${challengeId}`, target: `history:${id}` },
    { source: `timeline:${challengeId}`, target: `objective:${id}` },

    { source: `timeline:${userShortId}`, target: `timeline:${id}` },
    { source: `timeline:${challengeId}`, target: `timeline:${id}` },
    { source: `objective:${challengeId}`, target: `objective:${id}` }
  ];

  client.followMany(follows);
};

export const createRelationShips = () => {
  const challengeId = MUSCLE_CHALLENGE_ID;

  DUMMY_USER_ID_LIST.map(userShortId => {
    createRelationShip(userShortId, challengeId);
  });
  createRelationShip(TITAN_USER_SHORT_ID, challengeId);
  createRelationShip(TSUNE_USER_SHORT_ID, challengeId);
};

export const createStream = () => {
  createTopics();
  createNotes();
  createHistories();
  createObjectives();
  createRelationShips();
};
