import {
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  FETCH_PARTICIPANTS_ERROR,
  FETCH_PARTICIPANT_REQUEST,
  FETCH_PARTICIPANT_SUCCESS,
  FETCH_PARTICIPANT_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_PARTICIPANTS_REQUEST]: fetchRequest,
  [FETCH_PARTICIPANTS_SUCCESS]: fetchItemsSuccess,
  [FETCH_PARTICIPANTS_ERROR]: fetchError,
  [FETCH_PARTICIPANT_REQUEST]: fetchRequest,
  [FETCH_PARTICIPANT_SUCCESS]: fetchTargetSuccess,
  [FETCH_PARTICIPANT_ERROR]: fetchError
});
