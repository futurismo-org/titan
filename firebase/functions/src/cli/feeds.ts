import faker from 'faker';

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
    const feed = client.feed('user', userId);

    const activity = {
      actor: StreamUserId(userId),
      verb: 'TOPIC',
      object: `topic:${topicId}`,
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      topicId: topicId,
      title: faker.lorem.sentence(),
      path: `/c/${MUSCLE_CHALLENGE_ID}/t/${topicId}}`
    };

    feed.addActivity(activity);
  });
};

const createNotes = () => {
  DUMMY_NOTE_ID_LIST.map((noteId: string) => {
    const feed = client.feed('user', noteId);
    const userId =
      DUMMY_USER_ID_LIST[
        faker.random.number({ min: 0, max: DUMMY_USER_ID_LIST.length - 1 })
      ];

    const activity = {
      actor: StreamUserId(userId),
      verb: 'NOTE',
      object: `note:${noteId}`,
      time: getRandomCreatedAt().toISOString(),
      userId,
      collectionType: 'challenges',
      collectionId: MUSCLE_CHALLENGE_ID,
      userDisplayName: faker.name.firstName(),
      userPhotoURL: faker.image.avatar(),
      noteId: noteId,
      text: faker.lorem.paragraphs()
    };

    feed.addActivity(activity);
  });
};

export const createStream = () => {
  createTopics();
  createNotes();
};
