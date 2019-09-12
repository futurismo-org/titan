import faker from 'faker';
import moment from 'moment';
import shortId from 'shortid';

import admin from 'firebase-admin';
import {
  TITAN_USER_ID,
  TSUNE_USER_ID,
  DUMMY_TOPIC_ID_LIST,
  DUMMY_NOTE_ID_LIST,
  DUMMY_USER_ID_LIST,
  TITAN_USER_SHORT_ID,
  TSUNE_USER_SHORT_ID,
  MUSCLE_CHALLENGE_ID_LIST,
  MUSCLE_CATEGORY_ID,
  MEDITATION_CHALLENGE_ID_LIST,
  MEDITATION_CATEGORY_ID,
  GETUP_CATEGORY_ID,
  GETUP_CHALLENGE_ID_LIST,
  getRandomCreatedAt,
  getRandomUpdatedAt
} from './common';
import { configDev } from '../utils/config';

const config = configDev;

admin.initializeApp(config);

const client = require('firebase-tools');
const seed = require('firestore-seed');

faker.locale = 'ja';

const sampleChallengeChannelId = '589589350224756740'; // テスト用チャレンジチャンネル
const sampleGeneralChannelId = '588697657279512587'; // テスト用フリートークチャンネル

const sampleChallengeWebhookURL = ''; //公開していたらへんなbotに攻撃されたwww

const createTopicSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    title: faker.lorem.sentence(),
    url: 'https://example.com',
    text: faker.lorem.paragraphs(),
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt(),
    userId: id,
    userName: faker.name.firstName(),
    userPhotoURL: faker.image.avatar(),
    ...args
  });
};

const topicsSeeds = (
  collectionType: 'challenges' | 'categories' | 'general',
  collectionId: string
) =>
  seed.subcollection([
    createTopicSeed({
      id: shortId.generate(),
      userId: TITAN_USER_SHORT_ID,
      userName: 'Titan@公式',
      userPhotoURL:
        'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png',
      collectionType,
      collectionId
    }),
    ...DUMMY_TOPIC_ID_LIST.map((id: string) => {
      return createTopicSeed({
        id: id,
        collectionType,
        collectionId
      });
    })
  ]);

const createNoteSeed = (args: any) => {
  const { id } = args;

  return seed.doc(id, {
    text: faker.lorem.paragraphs(),
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt(),
    userId: id,
    userName: faker.name.firstName(),
    userPhotoURL: faker.image.avatar(),
    ...args
  });
};

const notesSeeds = seed.subcollection([
  createNoteSeed({
    id: shortId.generate(),
    userId: TITAN_USER_SHORT_ID,
    userName: 'Titan@公式',
    userPhotoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png'
  }),
  ...DUMMY_NOTE_ID_LIST.map((id: string) => {
    return createNoteSeed({
      id: id
    });
  })
]);

const createChallengeSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt(),
    overview: faker.lorem.paragraphs(),
    rules: faker.lorem.paragraphs(),
    webhookURL: sampleChallengeWebhookURL,
    channelId: sampleChallengeChannelId,
    topics: topicsSeeds('challenges', id),
    notes: notesSeeds,
    hashtag: '#サンプルチャレンジ',
    draft: false,
    recordStrategy: 'RECORD_STRATEGY_SIMPLE',
    ...args
  });
};

const createCategorySeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt(),
    overview: faker.lorem.paragraphs(),
    channelId: sampleGeneralChannelId,
    topics: topicsSeeds('categories', id),
    kind: 'CATEGORY_KIND_GOOD',
    ...args
  });
};

const createUserSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt(),
    ...args
  });
};

const createChallengeHistorySeed = (n: number) => {
  const array = ['RECORD', 'RESET'];

  return {
    id: shortId.generate(),
    timestamp: moment()
      .add(n, 'days')
      .toDate(),
    days: faker.random.number({ min: 0, max: 30 }),
    score: faker.random.number({ min: 0, max: 30 }),
    accDays: faker.random.number({ min: 0, max: 30 }),
    pastDays: faker.random.number({ min: 0, max: 30 }),
    type: array[Math.floor(Math.random() * array.length)],
    diff: n
  };
};

const createParticipationSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt(),
    challengeName: 'サンプルチャレンジ',
    ...args
  });
};

const createUserSecuritiesSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    email: faker.internet.email(),
    accessTokenKey: '',
    accessTokenSecret: '',
    ...args
  });
};

const challengeParticipantsSeeds = seed.subcollection([
  createParticipationSeed({
    id: TITAN_USER_SHORT_ID,
    histories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
      createChallengeHistorySeed(n)
    ),
    days: 5,
    score: 5,
    maxDays: 5,
    accDays: 5,
    pastDays: 9,
    displayName: 'Titan@公式',
    photoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png',
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt()
  }),
  createParticipationSeed({
    id: TSUNE_USER_SHORT_ID,
    histories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n =>
      createChallengeHistorySeed(n)
    ),
    days: 5,
    score: 31,
    maxDays: 5,
    accDays: 5,
    pastDays: 9,
    displayName: 'tsu-nera',
    photoURL: '',
    createdAt: getRandomCreatedAt(),
    updatedAt: getRandomUpdatedAt()
  }),
  ...DUMMY_USER_ID_LIST.map((id: string) => {
    return createParticipationSeed({
      id: id,
      histories: [
        ...Array(faker.random.number({ min: 3, max: 10 })).keys()
      ].map((n: number) => createChallengeHistorySeed(n)),
      days: faker.random.number({ min: 0, max: 30 }),
      score: faker.random.number({ min: 0, max: 30 }),
      maxDays: faker.random.number({ min: 0, max: 30 }),
      accDays: faker.random.number({ min: 0, max: 30 }),
      pastDays: faker.random.number({ min: 0, max: 30 }),
      displayName: faker.name.firstName(),
      photoURL: faker.image.imageUrl()
    });
  })
]);

const challengeSeeds = seed.collection('challenges', [
  createChallengeSeed({
    id: MUSCLE_CHALLENGE_ID_LIST[0],
    categoryRef: seed.docRef('categories', MUSCLE_CATEGORY_ID),
    title: '筋トレ３０日チャレンジ',
    description: '筋肉は裏切らない',
    participants: challengeParticipantsSeeds,
    participantsCount: 30,
    openedAt: new Date(
      moment()
        .toDate()
        .setHours(0, 0, 0, 0)
    ),
    closedAt: new Date(
      moment()
        .add(30, 'days')
        .toDate()
        .setHours(23, 59, 59, 59)
    ),
    price: 300,
    pinned: true
  }),
  createChallengeSeed({
    id: MUSCLE_CHALLENGE_ID_LIST[1],
    categoryRef: seed.docRef('categories', MUSCLE_CATEGORY_ID),
    title: '体重計測３０日チャレンジ',
    description: '毎日元気に体重計',
    participants: challengeParticipantsSeeds,
    participantsCount: 30,
    openedAt: new Date(
      moment()
        .toDate()
        .setHours(0, 0, 0, 0)
    ),
    closedAt: new Date(
      moment()
        .add(30, 'days')
        .toDate()
        .setHours(23, 59, 59, 59)
    ),
    price: 300
  }),
  createChallengeSeed({
    id: MEDITATION_CHALLENGE_ID_LIST[0],
    categoryRef: seed.docRef('categories', MEDITATION_CATEGORY_ID),
    title: '瞑想7日間チャレンジ',
    description: '瞑想は怪しくないよ',
    participantsCount: 0,
    openedAt: new Date(
      moment()
        .add(30, 'days')
        .toDate()
        .setHours(0, 0, 0, 0)
    ),
    closedAt: new Date(
      moment()
        .add(60, 'days')
        .toDate()
        .setHours(23, 59, 59, 59)
    )
  }),
  createChallengeSeed({
    id: GETUP_CHALLENGE_ID_LIST[0],
    categoryRef: seed.docRef('categories', GETUP_CATEGORY_ID),
    title: 'ベッドメイキング習慣化チャレンジ',
    description: '世界を変えたければ、ベッドメイキングから始めましょう',
    participants: challengeParticipantsSeeds,
    participantsCount: 30,
    openedAt: new Date(
      moment()
        .subtract(60, 'days')
        .toDate()
        .setHours(0, 0, 0, 0)
    ),
    closedAt: new Date(
      moment()
        .subtract(30, 'days')
        .toDate()
        .setHours(23, 59, 59, 59)
    ),
    price: 1000
  })
]);

const categorySeeds = seed.collection('categories', [
  createCategorySeed({
    title: '肉体改善',
    description: '筋肉があれば何でもできる',
    id: MUSCLE_CATEGORY_ID,
    challengeRefs: MUSCLE_CHALLENGE_ID_LIST.map((id: string) =>
      seed.docRef('challenges', id)
    )
  }),
  createCategorySeed({
    title: '瞑想',
    description: '安らかな心を',
    id: MEDITATION_CATEGORY_ID,
    challengeRefs: MEDITATION_CHALLENGE_ID_LIST.map((id: string) =>
      seed.docRef('challenges', id)
    )
  }),
  createCategorySeed({
    title: '睡眠',
    description: '良質な人生は良質な睡眠から',
    id: GETUP_CATEGORY_ID,
    challengeRefs: GETUP_CHALLENGE_ID_LIST.map((id: string) =>
      seed.docRef('challenges', id)
    )
  })
]);

const userSecuritiesSeeds = seed.subcollection([
  createUserSecuritiesSeed({
    id: shortId.generate()
  })
]);

const userSeeds = seed.collection('users', [
  createUserSeed({
    id: TITAN_USER_ID,
    shortId: TITAN_USER_SHORT_ID,
    displayName: 'Titan@公式',
    photoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png',
    isAdmin: true,
    twitterUsername: 'titan_dev_1234',
    introduction:
      '人生のどん底にいる32歳のプログラマ。神奈川県在住。いろいろたいへんなので、底辺から自己変革して人生を逆転します。',
    securities: userSecuritiesSeeds
  }),
  createUserSeed({
    id: TSUNE_USER_ID,
    shortId: TSUNE_USER_SHORT_ID,
    displayName: 'tsu-nera',
    photoURL: '',
    isAdmin: true,
    twitterUsername: 'tsu_nera',
    securities: userSecuritiesSeeds
  }),
  ...DUMMY_USER_ID_LIST.map((id: string) => {
    return createUserSeed({
      id: id,
      shortId: id,
      displayName: faker.name.firstName(),
      photoURL: faker.image.imageUrl(),
      isAdmin: false,
      securities: userSecuritiesSeeds
    });
  })
]);

const createCollection = (seeds: any) => {
  seeds.importDocuments(admin).catch((e: any) => {
    console.log('Failed to import documents: ' + e);
  });
};

export const createCollections = () => {
  createCollection(userSeeds);
  createCollection(categorySeeds);
  createCollection(challengeSeeds);
};

const deletePathResource = (path: string) => {
  const options = {
    recursive: true,
    allCollections: true
  };
  client.firestore.delete(path, options).catch((e: any) => {
    console.log('Failed to delete documents: ' + e);
  });
};

export const deleteCollections = () => {
  deletePathResource('/categories');
  deletePathResource('/challenges');
  deletePathResource('/users');
};
