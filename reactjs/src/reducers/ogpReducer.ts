import * as actionTypes from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

const title = 'Titan | 自己変革の火をつけるアプリ';
const description =
  'オナ禁・エロ禁を中心とした、自己変革を支援するアプリです。継続できない、情報不足、自己嫌悪感という３つの課題に取り組みます。';

const urlMap = new Map();
urlMap.set('development', 'https://titan-dev-1234.firebaseapp.com');
urlMap.set('production', 'https://titan-fire.com');
const url = urlMap.get(process.env.REACT_APP_ENV);

export const initialState = {
  title,
  description,
  url
};

export const setOgpInfo = (state: any, payload: any) => {
  return Object.assign({}, state, {
    title: payload.ogpInfo.title,
    description: payload.ogpInfo.description,
    url: payload.ogpInfo.url
  });
};

export default createReducer(initialState, {
  [actionTypes.SET_OGP_INFO]: setOgpInfo
});
