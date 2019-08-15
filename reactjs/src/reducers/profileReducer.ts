import {
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR
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
  [FETCH_PROFILES_REQUEST]: fetchRequest,
  [FETCH_PROFILES_SUCCESS]: fetchItemsSuccess,
  [FETCH_PROFILES_ERROR]: fetchError,
  [FETCH_PROFILE_REQUEST]: fetchRequest,
  [FETCH_PROFILE_SUCCESS]: fetchTargetSuccess,
  [FETCH_PROFILE_ERROR]: fetchError
});
