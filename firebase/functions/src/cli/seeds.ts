import faker from 'faker';
import moment from 'moment';
import shortid from 'shortid';

import admin from 'firebase-admin';
import { configDev } from '../utils/config';

const config = configDev;

admin.initializeApp(config);

const client = require('firebase-tools');
const seed = require('firestore-seed');

faker.locale = 'ja';

const muscleCategoryId = shortid.generate();
const meditationCategoryId = shortid.generate();
const getUpCategoryId = shortid.generate();

const muscleChallngeId = shortid.generate();
const muscleChallngeIds = [muscleChallngeId, shortid.generate()];
const meditationChallngeIds = [shortid.generate()];
const getUpChallngeIds = [shortid.generate()];

const titanShortId = shortid.generate();
const titanUserId = 'z2aTFBqRrzMi70tC9nnwRsj0zZC3';

const tsuneraShortId = shortid.generate();
const tsuneraUserId = 'oZEKc9c7k5XUIVxklYMVwvAiXbW2';

const sampleChallengeChannelId = '589589350224756740'; // テスト用チャレンジチャンネル
const sampleGeneralChannelId = '588697657279512587'; // テスト用フリートークチャンネル

const sampleChallengeWebhookURL = ''; //公開していたらへんなbotに攻撃されたwww

const dummyUserIds = [...Array(30).keys()].map((n: number) =>
  shortid.generate()
);
const dummyTopicIds = [...Array(10).keys()].map((n: number) =>
  shortid.generate()
);

const createTopicSeed = (args: any) => {
  const { id } = args;
  const now = new Date();
  return seed.doc(id, {
    title: faker.lorem.sentence(),
    url: 'https://example.com',
    text: faker.lorem.paragraphs(),
    createdAt: now,
    updatedAt: now,
    userId: shortid.generate(),
    userName: faker.name.firstName(),
    usrPhotoURL: faker.image.avatar(),
    ...args
  });
};

const topicsSeeds = seed.subcollection([
  createTopicSeed({
    id: shortid.generate(),
    userId: titanShortId,
    userName: 'Titan@公式',
    userPhotoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png'
  }),
  ...dummyTopicIds.map((id: string) => {
    return createTopicSeed({
      id: id
    });
  })
]);

const createChallengeSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: new Date(),
    updatedAt: faker.date.recent(),
    overview: faker.lorem.paragraphs(),
    rules: faker.lorem.paragraphs(),
    webhookURL: sampleChallengeWebhookURL,
    channelId: sampleChallengeChannelId,
    topics: topicsSeeds,
    hashtag: '#サンプルチャレンジ',
    draft: false,
    ...args
  });
};

const createCategorySeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: new Date(),
    updatedAt: faker.date.recent(),
    overview: faker.lorem.paragraphs(),
    channelId: sampleGeneralChannelId,
    topics: topicsSeeds,
    ...args
  });
};

const createUserSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: new Date(),
    updatedAt: faker.date.recent(),
    ...args
  });
};

const createChallengeHistorySeed = (n: number) => {
  const array = ['RECORD', 'RESET'];

  return {
    id: n,
    timestamp: moment()
      .subtract(n, 'days')
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
  const now = new Date();
  return seed.doc(id, {
    createdAt: now,
    startedAt: now,
    updatedAt: now,
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
    id: titanShortId,
    histories: [1, 2, 3, 4, 5].map(n => createChallengeHistorySeed(n)),
    days: 5,
    score: 5,
    maxDays: 5,
    accDays: 5,
    pastDays: 9,
    displayName: 'Titan@公式',
    photoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png'
  }),
  createParticipationSeed({
    id: tsuneraShortId,
    histories: [1, 2, 3, 4, 5].map(n => createChallengeHistorySeed(n)),
    days: 5,
    score: 31,
    maxDays: 5,
    accDays: 5,
    pastDays: 9,
    displayName: 'tsu-nera',
    photoURL: ''
  }),
  ...dummyUserIds.map((id: string) => {
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
    id: muscleChallngeIds[0],
    categoryRef: seed.docRef('categories', muscleCategoryId),
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
    pinned: true,
    youtubeId: 'lTil2ukokrM'
  }),
  createChallengeSeed({
    id: muscleChallngeIds[1],
    categoryRef: seed.docRef('categories', muscleCategoryId),
    title: '体重計測３０日チャレンジ',
    description: '毎日元気に体重計',
    participantsCount: 0,
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
    id: meditationChallngeIds[0],
    categoryRef: seed.docRef('categories', meditationCategoryId),
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
    id: getUpChallngeIds[0],
    categoryRef: seed.docRef('categories', getUpCategoryId),
    title: '早起きチャレンジ',
    description: '朝だ夜明けだ潮の息吹',
    participantsCount: 0,
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
    id: muscleCategoryId,
    challengeRefs: muscleChallngeIds.map((id: string) =>
      seed.docRef('challenges', id)
    )
  }),
  createCategorySeed({
    title: '瞑想',
    description: '安らかな心を',
    id: meditationCategoryId,
    challengeRefs: meditationChallngeIds.map((id: string) =>
      seed.docRef('challenges', id)
    )
  }),
  createCategorySeed({
    title: '睡眠',
    description: '良質な人生は良質な睡眠から',
    id: getUpCategoryId,
    challengeRefs: getUpChallngeIds.map((id: string) =>
      seed.docRef('challenges', id)
    )
  })
]);

const userSecuritiesSeeds = seed.subcollection([
  createUserSecuritiesSeed({
    id: shortid.generate()
  })
]);

const userSeeds = seed.collection('users', [
  createUserSeed({
    id: titanUserId,
    shortId: titanShortId,
    displayName: 'Titan@公式',
    photoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png',
    isAdmin: true,
    twitterUsername: 'titan_dev_1234',
    securities: userSecuritiesSeeds
  }),
  createUserSeed({
    id: tsuneraUserId,
    shortId: tsuneraShortId,
    displayName: 'tsu-nera',
    photoURL: '',
    isAdmin: true,
    twitterUsername: 'tsu_nera',
    securities: userSecuritiesSeeds
  }),
  ...dummyUserIds.map((id: string) => {
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
