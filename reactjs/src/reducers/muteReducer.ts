import {
  FETCH_MUTES_REQUEST,
  FETCH_MUTES_SUCCESS,
  FETCH_MUTES_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchError,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_MUTES_REQUEST]: fetchRequest,
  [FETCH_MUTES_SUCCESS]: fetchItemsSuccess,
  [FETCH_MUTES_ERROR]: fetchError
});
