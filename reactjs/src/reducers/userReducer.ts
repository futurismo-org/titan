import * as actionTypes from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = {};

export const setUserInfo = (state: any, payload: any) => {
  return Object.assign({}, state, {
    url: payload.userInfo.url
  });
};

export default createReducer(initialState, {
  [actionTypes.SET_USER_INFO]: setUserInfo
});
