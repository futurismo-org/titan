export const APP_NAME = 'Titan';
export const APP_TITLE = `${APP_NAME} | 自己変革の火をつけるアプリ`;
export const APP_DESCRIPTION =
  'オナ禁・エロ禁を中心とした、自分を変える若者のためのアプリです。自己変革を支援します。';
export const APP_PRODUCTION_URL = 'https://titan-fire.com';
export const APP_DEVELOPMENT_URL = 'https://titan-dev-1234.firebaseapp.com';

export const TITAN_LANDING_PAGE = 'https://titan-fire.netlify.com';
export const TITAN_PRIVACY_POLICY =
  'https://titan-fire.com/privacy_policy.html';
export const TITAN_TERMS_OF_USE = 'https://titan-fire.com/terms_of_use.html';
export const TITAN_BLOG_URL = 'https://note.mu/titan_dev';
export const TITAN_TWITTER_URL = 'https://twitter.com/titan_dev_1234';
export const TITAN_DISCORD_INVITE_URL = 'https://discord.gg/S3t5WgE';

export const TITAN_GOOGLE_PLAY_STORE =
  'https://play.google.com/store/apps/details?id=com.futurismo.titan';

const urlMap = new Map();
urlMap.set('development', APP_DEVELOPMENT_URL);
urlMap.set('production', APP_PRODUCTION_URL);
export const APP_URL = urlMap.get(process.env.REACT_APP_ENV);

export const APP_ICON_URL = `${APP_URL}/icon.png`;
