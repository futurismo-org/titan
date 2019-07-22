import {
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_ERROR,
  FETCH_CHALLENGE_REQUEST,
  RESET_CHALLENGE_INFO,
  FETCH_PINNED_CHALLENGES_SUCCESS,
  FETCH_PINNED_CHALLENGES_REQUEST,
  FETCH_PINNED_CHALLENGES_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError
} from './reducuerUtil';

export const initialState = {
  loading: false,
  error: null,
  loadingSub: false,
  errorSub: null,
  items: [],
  pinned: []
};

export const resetChallenge = (state: any) => {
  return Object.assign({}, state, {
    ...initialState
  });
};

export const fetchPinnedChallengesRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    pinned: [],
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
  [FETCH_CHALLENGES_REQUEST]: fetchRequest,
  [FETCH_CHALLENGES_SUCCESS]: fetchItemsSuccess,
  [FETCH_CHALLENGES_ERROR]: fetchError,
  [FETCH_CHALLENGE_REQUEST]: fetchRequest,
  [FETCH_CHALLENGE_SUCCESS]: fetchTargetSuccess,
  [FETCH_CHALLENGE_ERROR]: fetchError,
  [RESET_CHALLENGE_INFO]: resetChallenge,
  [FETCH_PINNED_CHALLENGES_REQUEST]: fetchPinnedChallengesRequest,
  [FETCH_PINNED_CHALLENGES_SUCCESS]: fetchPinnedChallengesSuccess,
  [FETCH_PINNED_CHALLENGES_ERROR]: fetchPinnedChallengesError
});
