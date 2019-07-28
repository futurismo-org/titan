import { APP_URL } from '../constants/appInfo';

const UNSPLASH_RANDOM_URL = 'https://source.unsplash.com/random';

export const withDomain = (url: string) => APP_URL + url;

const collectionMap = new Map([
  ['challenges', 'c'],
  ['categories', 'cat'],
  ['topics', 't'],
  ['users', 'u'],
  ['general', '']
]);

export const getUserDashboardPath = (
  challengeId: string,
  userShortId: string
) => `/c/${challengeId}/u/${userShortId}`;

export const collectionShort = (collection: string) =>
  collectionMap.get(collection);

export const collectionURL = (
  collection: 'challenges' | 'categories',
  collectionId: string
) =>
  collection === 'challenges'
    ? `/c/${collectionId}/overview`
    : `/cat/${collectionId}/dashboard`;

export const getTwitterProfileURL = (username: string) =>
  username ? `https://twitter.com/${username}` : 'https://twitter.com';

export const getTopicPath = (
  topicId: string,
  collection: 'general' | 'challenges' | 'categories',
  collectionId?: string
) =>
  collection === 'general'
    ? `/topics/${topicId}`
    : `/${collectionShort(collection)}/${collectionId}/t/${topicId}`;

export const getTopicsPath = (
  collection: 'general' | 'challenges' | 'categories',
  collectionId?: string
) =>
  collection === 'general'
    ? `/topics`
    : `/${collectionShort(collection)}/${collectionId}/topics`;

export const getRandomImageURL = () => {
  const randnum = Math.floor(Math.random() * 100);
  return `${UNSPLASH_RANDOM_URL}/${randnum}`;
};
