import { APP_URL } from '../constants/appInfo';

export const withDomain = (url: string) => APP_URL + url;

export const getUserDashboardPath = (
  challengeId: string,
  userShortId: string
) => `/c/${challengeId}/u/${userShortId}`;
