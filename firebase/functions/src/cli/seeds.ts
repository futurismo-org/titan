import { ulid } from 'ulid';
import faker from 'faker';
import moment from 'moment';

import admin from '../utils/admin';

const client = require('firebase-tools');
const seed = require('firestore-seed');

faker.locale = 'ja';

const muscleCategoryId = ulid();
const meditationCategoryId = ulid();
const getUpCategoryId = ulid();

const muscleChallngeId = ulid();
const muscleChallngeIds = [muscleChallngeId, ulid()];
const meditationChallngeIds = [ulid()];
const getUpChallngeIds = [ulid()];

const titanUserId = 'z2aTFBqRrzMi70tC9nnwRsj0zZC3';

const sampleChallengeChannelId = '589589350224756740'; // テスト用チャレンジチャンネル
const sampleGeneralChannelId = '588697657279512587'; // テスト用フリートークチャンネル

const sampleChallengeWebhookURL = ''; //公開していたらへんなbotに攻撃されたwww

const dummyUserIds = [...Array(30).keys()].map((n: number) => ulid());

const createChallengeSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: new Date(),
    updatedAt: faker.date.recent(),
    overview: faker.lorem.paragraphs(),
    rules: faker.lorem.paragraphs(),
    webhookURL: sampleChallengeWebhookURL,
    channelId: sampleChallengeChannelId,
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

const createParticipationSeed = (args: any) => {
  const { id } = args;
  const now = new Date();
  return seed.doc(id, {
    createdAt: now,
    startDate: now,
    updatedAt: now,
    ...args
  });
};

const createChallengeHistorySeed = (n: number) => {
  return {
    id: n,
    timestamp: moment()
      .subtract(n, 'days')
      .toDate(),
    content: ''
  };
};

const challengeParticipantsSeeds = seed.subcollection([
  createParticipationSeed({
    id: titanUserId,
    histories: [1, 2, 3, 4, 5].map(n => createChallengeHistorySeed(n)),
    days: 5,
    score: 5,
    displayName: 'Titan',
    photoURL:
      'https://pbs.twimg.com/profile_images/1138185527843123200/4eE4LPiu_normal.png'
  }),
  ...dummyUserIds.map((id: string) => {
    return createParticipationSeed({
      id: id,
      histories: [
        ...Array(faker.random.number({ min: 3, max: 10 })).keys()
      ].map((n: number) => createChallengeHistorySeed(n)),
      days: faker.random.number({ min: 0, max: 30 }),
      score: faker.random.number({ min: 0, max: 30 }),
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
    openedAt: moment().toDate(),
    closedAt: moment()
      .add(30, 'days')
      .toDate()
  }),
  createChallengeSeed({
    id: muscleChallngeIds[1],
    categoryRef: seed.docRef('categories', muscleCategoryId),
    title: '体重計測３０日チャレンジ',
    description: '毎日元気に体重計',
    participantsCount: 0,
    private: true,
    openedAt: moment().toDate(),
    closedAt: moment()
      .add(30, 'days')
      .toDate()
  }),
  createChallengeSeed({
    id: meditationChallngeIds[0],
    categoryRef: seed.docRef('categories', meditationCategoryId),
    title: '瞑想7日間チャレンジ',
    description: '瞑想は怪しくないよ',
    participantsCount: 0,
    openedAt: moment()
      .add(30, 'days')
      .toDate(),
    closedAt: moment()
      .add(60, 'days')
      .toDate()
  }),
  createChallengeSeed({
    id: getUpChallngeIds[0],
    categoryRef: seed.docRef('categories', getUpCategoryId),
    title: '早起きチャレンジ',
    description: '朝だ夜明けだ潮の息吹',
    participantsCount: 0,
    openedAt: moment()
      .subtract(60, 'days')
      .toDate(),
    closedAt: moment()
      .subtract(30, 'days')
      .toDate()
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

const userSeeds = seed.collection('users', [
  createUserSeed({
    email: '',
    displayName: 'Titan',
    id: titanUserId,
    photoURL:
      'https://pbs.twimg.com/profile_images/1110227722779820032/zAPk1WXn_normal.jpg',
    isAdmin: true
  }),
  createUserSeed({
    email: '',
    displayName: 'tsu-nera',
    id: 'hFVDONlKmeV4snOJGKuUQM5yCtp1',
    photoURL:
      'https://pbs.twimg.com/profile_images/947018640947232768/-Gm-dXvn_normal.jpg',
    isAdmin: true
  }),
  ...dummyUserIds.map((id: string) => {
    return createUserSeed({
      id: id,
      email: faker.internet.email(),
      displayName: faker.name.firstName(),
      photoURL: faker.image.imageUrl(),
      isAdmin: false
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
  client.firestore
    .delete(path, {
      recursive: true,
      yes: true
    })
    .catch((e: any) => {
      console.log('Failed to delete documents: ' + e);
    });
};

export const deleteCollections = () => {
  deletePathResource('/categories');
  deletePathResource('/challenges');
  deletePathResource('/users');
};
