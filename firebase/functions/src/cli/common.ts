import faker from 'faker';
import moment from 'moment';
import shortId from 'shortid';

require('dotenv').config();

// userId
export const TITAN_USER_ID = 'z2aTFBqRrzMi70tC9nnwRsj0zZC3';
export const TSUNE_USER_ID = 'oZEKc9c7k5XUIVxklYMVwvAiXbW2';

// getstream
export const GETSTREAM_KEY = process.env.GETSTREAM_KEY;
export const GETSTREAM_SECRET = process.env.GETSTREAM_SECRET;
export const GETSTREAM_APP_ID = process.env.GETSTREAM_APP_ID;

export const MUSCLE_CATEGORY_ID = shortId.generate();
export const MEDITATION_CATEGORY_ID = shortId.generate();
export const GETUP_CATEGORY_ID = shortId.generate();

export const MUSCLE_CHALLENGE_ID = shortId.generate();
export const MUSCLE_CHALLENGE_ID_LIST = [
  MUSCLE_CHALLENGE_ID,
  shortId.generate()
];
export const MEDITATION_CHALLENGE_ID_LIST = [shortId.generate()];
export const GETUP_CHALLENGE_ID_LIST = [shortId.generate()];

export const TITAN_USER_SHORT_ID = '4Lsomlnzla';
export const TSUNE_USER_SHORT_ID = 'QQzMg4NKUq';

export const DUMMY_USER_ID_LIST = [...Array(30).keys()].map((n: number) =>
  shortId.generate()
);

export const DUMMY_TOPIC_ID_LIST = [...Array(50).keys()].map(
  (n: number) => DUMMY_USER_ID_LIST[faker.random.number({ min: 0, max: 29 })]
);

export const DUMMY_NOTE_ID_LIST = [...Array(50).keys()].map(
  (n: number) => DUMMY_USER_ID_LIST[faker.random.number({ min: 0, max: 29 })]
);

export const getRandomCreatedAt = () => {
  const now = new Date();
  const n = faker.random.number({ min: 15, max: 30 });
  return moment(now)
    .subtract(n, 'day')
    .toDate();
};

export const getRandomUpdatedAt = () => {
  const now = new Date();
  const n = faker.random.number({ min: 0, max: 14 });
  return moment(now)
    .subtract(n, 'day')
    .toDate();
};
