import {
  FETCH_FIREBASE_USER_REQUEST,
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  RESET_USER_INFO,
  FETCH_FIREBASE_USER_SUCCESS,
  FETCH_FIREBASE_USER_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError,
  reset
} from './reducuerUtil';

export const setUserInfo = (state: any, payload: any) => {
  return Object.assign({}, state, {
    url: payload.userInfo.url
  });
};

export const fetchFirebaseUserRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingFirebase: true
  });
};

export const fetchFirebaseUserSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingFirebase: false,
    profile: payload
  });
};

export const fetchFirebaseUserError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingFirebase: false,
    errorFirebase: error
  });
};

export const initialState = {
  loading: false,
  items: [],
  target: null,
  error: null,
  loadingFierbase: false,
  profile: null,
  errorFirebase: null
};

export default createReducer(initialState, {
  [FETCH_USERS_REQUEST]: fetchRequest,
  [FETCH_USERS_SUCCESS]: fetchItemsSuccess,
  [FETCH_USERS_ERROR]: fetchError,
  [FETCH_USER_REQUEST]: fetchRequest,
  [FETCH_USER_SUCCESS]: fetchTargetSuccess,
  [FETCH_USER_ERROR]: fetchError,
  [RESET_USER_INFO]: reset,
  [SET_USER_INFO]: setUserInfo,
  [FETCH_FIREBASE_USER_REQUEST]: fetchFirebaseUserRequest,
  [FETCH_FIREBASE_USER_SUCCESS]: fetchFirebaseUserSuccess,
  [FETCH_FIREBASE_USER_ERROR]: fetchFirebaseUserError
});
