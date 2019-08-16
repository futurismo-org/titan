import {
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_REQUEST_SUB,
  FETCH_PROFILE_SUCCESS_SUB,
  FETCH_PROFILE_ERROR_SUB
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError,
  fetchRequestSub,
  fetchTargetSuccessSub,
  fetchErrorSub,
  initialState
} from './reducuerUtil';

export default createReducer(initialState, {
  [FETCH_PROFILES_REQUEST]: fetchRequest,
  [FETCH_PROFILES_SUCCESS]: fetchItemsSuccess,
  [FETCH_PROFILES_ERROR]: fetchError,
  [FETCH_PROFILE_REQUEST]: fetchRequest,
  [FETCH_PROFILE_SUCCESS]: fetchTargetSuccess,
  [FETCH_PROFILE_ERROR]: fetchError,
  [FETCH_PROFILE_REQUEST_SUB]: fetchRequestSub,
  [FETCH_PROFILE_SUCCESS_SUB]: fetchTargetSuccessSub,
  [FETCH_PROFILE_ERROR_SUB]: fetchErrorSub
});
