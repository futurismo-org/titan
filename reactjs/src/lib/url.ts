import { APP_URL } from '../constants/appInfo';

export const withDomain = (url: string) => APP_URL + url;

export const getUserDashboardPath = (
  challengeId: string,
  userShortId: string
) => `/c/${challengeId}/u/${userShortId}`;

export const getCollectionShort = (collection: string) =>
  collection === 'general' ? '' : collection === 'challenges' ? 'c' : 'cat';

export const getCollectionURL = (collection: string) =>
  collection === 'general' ? '' : collection === 'challenges' ? 'c' : 'cat';

export const getTwitterProfileURL = (username: string) =>
  username ? `https://twitter.com/${username}` : 'https://twitter.com';
