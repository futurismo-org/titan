import {
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR,
  FETCH_TOPICS_REQUEST,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_ERROR,
  FETCH_TOPIC_REQUEST,
  RESET_TOPIC_INFO
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError,
  reset,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_TOPICS_REQUEST]: fetchRequest,
  [FETCH_TOPICS_SUCCESS]: fetchItemsSuccess,
  [FETCH_TOPICS_ERROR]: fetchError,
  [FETCH_TOPIC_REQUEST]: fetchRequest,
  [FETCH_TOPIC_SUCCESS]: fetchTargetSuccess,
  [FETCH_TOPIC_ERROR]: fetchError,
  [RESET_TOPIC_INFO]: reset
});
