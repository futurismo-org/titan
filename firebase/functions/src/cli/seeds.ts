import { ulid } from 'ulid';
import faker from 'faker';
import cli from 'firebase-admin';
import { DocumentSnapshot } from '@google-cloud/firestore';

const seed = require('firestore-seed');

const cliConfig = require('../utils/config');

cli.initializeApp(cliConfig);
faker.locale = 'ja';

/* eslint-disable no-console */

const createChallengeSeed = (args: any) => {
  const id = ulid();
  return seed.doc(id, {
    id: id,
    createdAt: faker.date.recent(),
    overview: faker.lorem.paragraphs(),
    rules: faker.lorem.paragraphs(),
    ...args
  });
};

const challengeSeeds = seed.collection('challenges', [
  createChallengeSeed({
    title: '筋トレ３０日チャレンジ',
    description: '筋肉は裏切らない'
  }),
  createChallengeSeed({
    title: '瞑想7日間チャレンジ',
    description: '瞑想は怪しくないよ'
  }),
  createChallengeSeed({
    title: '早起きチャレンジ',
    description: '朝だ夜明けだ潮の息吹'
  })
]);

export const deleteChallenges = () => {
  cli
    .firestore()
    .collection('challenges')
    .get()
    .then((challenges: any) =>
      challenges.docs.map((challenge: DocumentSnapshot) =>
        challenge.ref.delete()
      )
    )
    .then(() => {
      console.log('Successfully deleted documents.');
    })
    .catch((e: any) => {
      console.log('Failed to delete documents: ' + e);
    });
};

export const createChallenges = () => {
  challengeSeeds
    .importDocuments(cli)
    .then(() => {
      console.log('Successfully imported documents.');
    })
    .catch((e: any) => {
      console.log('Failed to import documents: ' + e);
    });
};
