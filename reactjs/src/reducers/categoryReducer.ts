import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  FETCH_CATEGORY_REQUEST,
  RESET_CATEGORY_INFO
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
  [FETCH_CATEGORIES_REQUEST]: fetchRequest,
  [FETCH_CATEGORIES_SUCCESS]: fetchItemsSuccess,
  [FETCH_CATEGORIES_ERROR]: fetchError,
  [FETCH_CATEGORY_REQUEST]: fetchRequest,
  [FETCH_CATEGORY_SUCCESS]: fetchTargetSuccess,
  [FETCH_CATEGORY_ERROR]: fetchError,
  [RESET_CATEGORY_INFO]: reset
});
