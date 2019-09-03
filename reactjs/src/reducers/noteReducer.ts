import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  FETCH_NOTE_REQUEST,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR
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
  [FETCH_NOTES_REQUEST]: fetchRequest,
  [FETCH_NOTES_SUCCESS]: fetchItemsSuccess,
  [FETCH_NOTES_ERROR]: fetchError,
  [FETCH_NOTE_REQUEST]: fetchRequest,
  [FETCH_NOTE_SUCCESS]: fetchTargetSuccess,
  [FETCH_NOTE_ERROR]: fetchError
});
