import {
  FETCH_BLOCKS_REQUEST,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchError,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_BLOCKS_REQUEST]: fetchRequest,
  [FETCH_BLOCKS_SUCCESS]: fetchItemsSuccess,
  [FETCH_BLOCKS_ERROR]: fetchError
});
