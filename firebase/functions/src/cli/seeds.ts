import { ulid } from 'ulid';
import faker from 'faker';
import cli from 'firebase-admin';
import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';

import moment from 'moment';

var client = require('firebase-tools');

const seed = require('firestore-seed');

const cliConfig = require('../utils/config');

cli.initializeApp(cliConfig);
faker.locale = 'ja';

const muscleCategoryId = ulid();
const meditationCategoryId = ulid();
const getUpCategoryId = ulid();
const noFapCategoryId = ulid();

const muscleChallngeId = ulid();
const muscleChallngeIds = [muscleChallngeId, ulid()];
const meditationChallngeIds = [ulid()];
const getUpChallngeIds = [ulid()];
const noFapChallengeIds: string[] = [];

const titanUserId = 'MHgvTNT4JrMRKXCmnKbDMZkwv2l2';

const createChallengeSeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: new Date(),
    updatedAt: faker.date.recent(),
    overview: faker.lorem.paragraphs(),
    rules: faker.lorem.paragraphs(),
    isActive: true,
    ...args
  });
};

const createCategorySeed = (args: any) => {
  const { id } = args;
  return seed.doc(id, {
    createdAt: new Date(),
    updatedAt: faker.date.recent(),
    overview: faker.lorem.paragraphs(),
    rules: faker.lorem.paragraphs(),
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
  const now = Date();
  return seed.doc(id, {
    createdAt: now,
    startDate: now,
    updatedDate: now,
    ...args
  });
};

const challengeParticipantsSeeds = seed.subcollection([
  createParticipationSeed({
    id: titanUserId,
    histories: [1, 2, 3, 4, 5].map(n =>
      moment()
        .subtract(n, 'days')
        .toDate()
    ),
    days: 5
  })
]);

const challengeSeeds = seed.collection('challenges', [
  createChallengeSeed({
    id: muscleChallngeIds[0],
    category: muscleCategoryId,
    title: '筋トレ３０日チャレンジ',
    description: '筋肉は裏切らない',
    participants: challengeParticipantsSeeds
  }),
  createChallengeSeed({
    id: muscleChallngeIds[1],
    category: muscleCategoryId,
    title: '体重計測３０日チャレンジ',
    description: '毎日元気に体重計'
  }),
  createChallengeSeed({
    id: meditationChallngeIds[0],
    category: meditationCategoryId,
    title: '瞑想7日間チャレンジ',
    description: '瞑想は怪しくないよ'
  }),
  createChallengeSeed({
    id: getUpChallngeIds[0],
    category: getUpCategoryId,
    title: '早起きチャレンジ',
    description: '朝だ夜明けだ潮の息吹'
  })
]);

const categorySeeds = seed.collection('categories', [
  createCategorySeed({
    title: '肉体改善',
    description: '筋肉があれば何でもできる',
    id: muscleCategoryId,
    challenges: muscleChallngeIds
  }),
  createCategorySeed({
    title: '瞑想',
    description: '安らかな心を',
    id: meditationCategoryId,
    challenges: meditationChallngeIds
  }),
  createCategorySeed({
    title: '睡眠',
    description: '良質な人生は良質な睡眠から',
    id: getUpCategoryId,
    challenges: getUpChallngeIds
  }),
  createCategorySeed({
    title: 'オナ禁',
    description: 'オナ禁で生活を豊かに',
    id: noFapCategoryId,
    challenges: noFapChallengeIds
  })
]);

const userSeeds = seed.collection('users', [
  createUserSeed({
    email: '',
    displayName: 'Titan',
    id: titanUserId,
    photoURL:
      'https://pbs.twimg.com/profile_images/1110227722779820032/zAPk1WXn_normal.jpg'
  }),
  createUserSeed({
    email: '',
    displayName: 'tsu-nera',
    id: 'hFVDONlKmeV4snOJGKuUQM5yCtp1',
    photoURL:
      'https://pbs.twimg.com/profile_images/947018640947232768/-Gm-dXvn_normal.jpg'
  })
]);

const createCollection = (seeds: any) => {
  seeds.importDocuments(cli).catch((e: any) => {
    console.log('Failed to import documents: ' + e);
  });
};

export const createCollections = () => {
  createCollection(categorySeeds);
  createCollection(challengeSeeds);
  createCollection(userSeeds);
};

const deleteCollection = (title: string) => {
  cli
    .firestore()
    .collection(title)
    .get()
    .then((query: QuerySnapshot) =>
      query.docs.map((doc: DocumentSnapshot) => doc.ref.delete())
    )
    .catch((e: any) => {
      console.log('Failed to delete documents: ' + e);
    });
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
