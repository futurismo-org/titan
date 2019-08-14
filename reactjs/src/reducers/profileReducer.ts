import {
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_ERROR
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchError,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_PROFILES_REQUEST]: fetchRequest,
  [FETCH_PROFILES_SUCCESS]: fetchItemsSuccess,
  [FETCH_PROFILES_ERROR]: fetchError
});
