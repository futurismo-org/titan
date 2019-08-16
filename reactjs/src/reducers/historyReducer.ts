import {
  FETCH_HISTORIES_REQUEST,
  FETCH_HISTORIES_SUCCESS,
  FETCH_HISTORIES_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchError,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_HISTORIES_REQUEST]: fetchRequest,
  [FETCH_HISTORIES_SUCCESS]: fetchItemsSuccess,
  [FETCH_HISTORIES_ERROR]: fetchError
});
