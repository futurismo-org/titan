import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_REQUEST
} from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = { loading: false, items: [], error: null };

export const fetchCategoriesRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: true
  });
};

export const fetchCategoriesSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    items: payload
  });
};

export const fetchCategoriesError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loading: false,
    error: error
  });
};

export default createReducer(initialState, {
  [FETCH_CATEGORIES_REQUEST]: fetchCategoriesRequest,
  [FETCH_CATEGORIES_SUCCESS]: fetchCategoriesSuccess,
  [FETCH_CATEGORIES_ERROR]: fetchCategoriesError
});
