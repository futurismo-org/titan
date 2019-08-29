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
  DUMMY_NOTE_ID_LIST
} from './common';

const client = stream.connect(
  GETSTREAM_KEY as string,
  GETSTREAM_SECRET as string,
  GETSTREAM_APP_ID as string
);

const StreamUserId = (userId: string) => `SU:${userId}`;

const createTopics = () => {
  DUMMY_TOPIC_ID_LIST.map((topicId: string) => {
    const userId =
      DUMMY_USER_ID_LIST[
        faker.random.number({ min: 0, max: DUMMY_USER_ID_LIST.length - 1 })
      ];
    const feed = client.feed('topic', userId);

    const activity = {
      actor: StreamUserId(userId),
      verb: 'TOPIC',
      object: `topic:${topicId}`,
      foreign_id: `challenge:${MUSCLE_CHALLENGE_ID}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      topicId: topicId,
      title: faker.lorem.sentence(),
      path: `/c/${MUSCLE_CHALLENGE_ID}/t/${topicId}}`,
      challengeId: MUSCLE_CHALLENGE_ID
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
    const feed = client.feed('note', userId);
    const activity = {
      actor: StreamUserId(userId),
      verb: 'NOTE',
      object: `note:${noteId}`,
      foreign_id: `challenge:${MUSCLE_CHALLENGE_ID}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      noteId: noteId,
      text: faker.lorem.paragraphs(),
      challengeId: MUSCLE_CHALLENGE_ID
    };

    feed.addActivity(activity);
  });
};

const createHistories = () => {
  DUMMY_USER_ID_LIST.map(userId => {
    const historyId = shortId.generate();
    const feed = client.feed('history', userId);

    const activity1 = {
      actor: StreamUserId(userId),
      verb: 'RESET',
      object: `history:${historyId}`,
      foreign_id: `challenge:${MUSCLE_CHALLENGE_ID}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      historyId: historyId,
      challengeId: MUSCLE_CHALLENGE_ID
    };

    const historyId2 = shortId.generate();
    const activity2 = {
      actor: StreamUserId(userId),
      verb: 'RECORD',
      object: `history:${historyId2}`,
      foreign_id: `challenge:${MUSCLE_CHALLENGE_ID}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      historyId: historyId2,
      challengeId: MUSCLE_CHALLENGE_ID
    };

    feed.addActivities([activity1, activity2]);
  });
};

const createObjectives = () => {
  DUMMY_USER_ID_LIST.map(userId => {
    const objectiveId = MUSCLE_CHALLENGE_ID;
    const feed = client.feed('objective', userId);

    const activity = {
      actor: StreamUserId(userId),
      verb: 'OBJECTIVE',
      object: `objective:${objectiveId}`,
      foreign_id: `challenge:${MUSCLE_CHALLENGE_ID}`, // eslint-disable-line
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      objectiveId: objectiveId,
      challengeId: MUSCLE_CHALLENGE_ID,
      days: 3,
      createdAt: new Date().toISOString(),
      what: '頑張りマンモス'
    };
    feed.addActivity(activity);
  });
};

export const createStream = () => {
  createTopics();
  createNotes();
  createHistories();
  createObjectives();
};
