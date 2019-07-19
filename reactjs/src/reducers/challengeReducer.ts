import {
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  FETCH_CHALLENGES_REQUEST
} from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = { loading: false, items: [], error: null };

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

export default createReducer(initialState, {
  [FETCH_CHALLENGES_REQUEST]: fetchChallengesRequest,
  [FETCH_CHALLENGES_SUCCESS]: fetchChallengesSuccess,
  [FETCH_CHALLENGES_ERROR]: fetchChallengesError
});
