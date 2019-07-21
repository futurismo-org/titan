import {
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError,
  initialState
} from './reducuerUtil';

export const setUserInfo = (state: any, payload: any) => {
  return Object.assign({}, state, {
    url: payload.userInfo.url
  });
};

export default createReducer(initialState, {
  [FETCH_USERS_REQUEST]: fetchRequest,
  [FETCH_USERS_SUCCESS]: fetchItemsSuccess,
  [FETCH_USERS_ERROR]: fetchError,
  [FETCH_USER_REQUEST]: fetchRequest,
  [FETCH_USER_SUCCESS]: fetchTargetSuccess,
  [FETCH_USER_ERROR]: fetchError,
  [SET_USER_INFO]: setUserInfo
});
