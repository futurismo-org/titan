import {
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR,
  FETCH_TOPICS_REQUEST
} from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = { loading: false, items: [], error: null };

export const fetchTopicsRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};

export const fetchTopicsSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    items: payload
  });
};

export const fetchTopicsError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};

export default createReducer(initialState, {
  [FETCH_TOPICS_REQUEST]: fetchTopicsRequest,
  [FETCH_TOPICS_SUCCESS]: fetchTopicsSuccess,
  [FETCH_TOPICS_ERROR]: fetchTopicsError
});
