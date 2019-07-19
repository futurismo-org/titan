import {
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  FETCH_CHALLENGES_REQUEST,
  FETCH_PINNED_CHALLENGES_SUCCESS,
  FETCH_PINNED_CHALLENGES_REQUEST,
  FETCH_PINNED_CHALLENGES_ERROR
} from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = {
  loading: false,
  error: null,
  loadingSub: false,
  errorSub: null,
  items: [],
  pinned: []
};

export const fetchChallengesRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};

export const fetchChallengesSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    items: payload
  });
};

export const fetchChallengesError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};

export const fetchPinnedChallengesRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: true
  });
};

export const fetchPinnedChallengesSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: false,
    pinned: payload
  });
};

export const fetchPinnedChallengesError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingSub: false,
    errorSub: error
  });
};

export default createReducer(initialState, {
  [FETCH_CHALLENGES_REQUEST]: fetchChallengesRequest,
  [FETCH_CHALLENGES_SUCCESS]: fetchChallengesSuccess,
  [FETCH_CHALLENGES_ERROR]: fetchChallengesError,
  [FETCH_PINNED_CHALLENGES_REQUEST]: fetchPinnedChallengesRequest,
  [FETCH_PINNED_CHALLENGES_SUCCESS]: fetchPinnedChallengesSuccess,
  [FETCH_PINNED_CHALLENGES_ERROR]: fetchPinnedChallengesError
});
