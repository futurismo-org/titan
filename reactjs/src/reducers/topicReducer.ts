import {
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR,
  FETCH_TOPICS_REQUEST,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_ERROR,
  FETCH_TOPIC_REQUEST
} from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = {
  loading: false,
  error: null,
  items: [],
  target: null
};

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

export const fetchTopicRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};

export const fetchTopicSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    target: payload
  });
};

export const fetchTopicError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};

export default createReducer(initialState, {
  [FETCH_TOPICS_REQUEST]: fetchTopicsRequest,
  [FETCH_TOPICS_SUCCESS]: fetchTopicsSuccess,
  [FETCH_TOPICS_ERROR]: fetchTopicsError,
  [FETCH_TOPIC_REQUEST]: fetchTopicRequest,
  [FETCH_TOPIC_SUCCESS]: fetchTopicSuccess,
  [FETCH_TOPIC_ERROR]: fetchTopicError
});
