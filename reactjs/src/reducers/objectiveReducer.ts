import {
  FETCH_OBJECTIVES_REQUEST,
  FETCH_OBJECTIVES_SUCCESS,
  FETCH_OBJECTIVES_ERROR,
  FETCH_OBJECTIVE_REQUEST,
  FETCH_OBJECTIVE_SUCCESS,
  FETCH_OBJECTIVE_ERROR
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
  [FETCH_OBJECTIVES_REQUEST]: fetchRequest,
  [FETCH_OBJECTIVES_SUCCESS]: fetchItemsSuccess,
  [FETCH_OBJECTIVES_ERROR]: fetchError,
  [FETCH_OBJECTIVE_REQUEST]: fetchRequest,
  [FETCH_OBJECTIVE_SUCCESS]: fetchTargetSuccess,
  [FETCH_OBJECTIVE_ERROR]: fetchError
});
