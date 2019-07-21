import {
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
} from '../constants/actionTypes';

import { createReducer } from './reducuerUtil';

export const initialState = {
  loading: false,
  error: null,
  items: []
};

export const fetchUsersRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};

export const fetchUsersSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    items: payload
  });
};

export const fetchUsersError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};

export const setUserInfo = (state: any, payload: any) => {
  return Object.assign({}, state, {
    url: payload.userInfo.url
  });
};

export default createReducer(initialState, {
  [FETCH_USERS_REQUEST]: fetchUsersRequest,
  [FETCH_USERS_SUCCESS]: fetchUsersSuccess,
  [FETCH_USERS_ERROR]: fetchUsersError,
  [SET_USER_INFO]: setUserInfo
});
