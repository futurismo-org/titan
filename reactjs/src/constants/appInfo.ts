export const APP_NAME = 'Titan';
export const APP_TITLE = `${APP_NAME} | 自己変革の火をつけるアプリ`;
export const APP_DESCRIPTION =
  'オナ禁・エロ禁を中心とした、自分を変える若者のためのアプリです。自己変革を支援します。';
export const APP_PRODUCTION_URL = 'https://titan-fire.com';
export const APP_DEVELOPMENT_URL = 'https://titan-dev-1234.firebaseapp.com';

const urlMap = new Map();
urlMap.set('development', APP_DEVELOPMENT_URL);
urlMap.set('production', APP_PRODUCTION_URL);
export const APP_URL = urlMap.get(process.env.REACT_APP_ENV);

export const APP_ICON_URL = `${APP_URL}/icon.png`;
