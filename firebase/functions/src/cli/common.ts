import faker from 'faker';
import moment from 'moment';
import shortId from 'shortid';

// userId
export const TITAN_USER_ID = 'z2aTFBqRrzMi70tC9nnwRsj0zZC3';
export const TSUNE_USER_ID = 'oZEKc9c7k5XUIVxklYMVwvAiXbW2';

// getstream
export const GETSTREAM_KEY = process.env.GETSTREAM_KEY;
export const GETSTREAM_SECRET = process.env.GETSTREAM_SECRET;
export const GETSTREAM_APP_ID = process.env.GETSTREAM_APP_ID;

export const DUMMY_USER_ID_LIST = [...Array(50).keys()].map((n: number) =>
  shortId.generate()
);

export const DUMMY_TOPIC_ID_LIST = [...Array(100).keys()].map(
  (n: number) => DUMMY_USER_ID_LIST[faker.random.number({ min: 0, max: 49 })]
);

export const DUMMY_NOTE_ID_LIST = [...Array(100).keys()].map(
  (n: number) => DUMMY_USER_ID_LIST[faker.random.number({ min: 0, max: 29 })]
);
