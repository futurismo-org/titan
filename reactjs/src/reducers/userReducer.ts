import {
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../constants/actionTypes';

import { createReducer } from './reducuerUtil';

export const initialState = {
  loading: false,
  error: null,
  items: [],
  target: null
};

export const setUserInfo = (state: any, payload: any) => {
  return Object.assign({}, state, {
    url: payload.userInfo.url
  });
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
export const fetchUserRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};

export const fetchUserSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    target: payload
  });
};

export const fetchUserError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};

export default createReducer(initialState, {
  [FETCH_USERS_REQUEST]: fetchUsersRequest,
  [FETCH_USERS_SUCCESS]: fetchUsersSuccess,
  [FETCH_USERS_ERROR]: fetchUsersError,
  [FETCH_USER_REQUEST]: fetchUserRequest,
  [FETCH_USER_SUCCESS]: fetchUserSuccess,
  [FETCH_USER_ERROR]: fetchUserError,
  [SET_USER_INFO]: setUserInfo
});
