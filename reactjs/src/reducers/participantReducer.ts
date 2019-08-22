import {
  FETCH_PARTICIPANTS_REQUEST,
  FETCH_PARTICIPANTS_SUCCESS,
  FETCH_PARTICIPANTS_ERROR,
  FETCH_PARTICIPANT_REQUEST,
  FETCH_PARTICIPANT_SUCCESS,
  FETCH_PARTICIPANT_ERROR,
  FETCH_PARTICIPANT_EXIST_REQUEST,
  FETCH_PARTICIPANT_EXIST_ERROR,
  FETCH_PARTICIPANT_EXIST_SUCCESS
} from '../constants/actionTypes';

import {
  createReducer,
  fetchRequest,
  fetchItemsSuccess,
  fetchTargetSuccess,
  fetchError
} from './reducuerUtil';

export const fetchExistRequest = (state: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingExist: true
  });
};

export const fetchExistSuccess = (state: any, payload: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingExist: false,
    exist: payload
  });
};

export const fetchExistError = (state: any, error: any) => {
  return Object.assign({}, state, {
    ...state,
    loadingExist: false,
    errorExist: error
  });
};

export const initialState = {
  loading: false,
  items: [],
  target: null,
  error: null,
  exist: false,
  loadingExist: false,
  errorExist: null
};

export default createReducer(initialState, {
  [FETCH_PARTICIPANTS_REQUEST]: fetchRequest,
  [FETCH_PARTICIPANTS_SUCCESS]: fetchItemsSuccess,
  [FETCH_PARTICIPANTS_ERROR]: fetchError,
  [FETCH_PARTICIPANT_REQUEST]: fetchRequest,
  [FETCH_PARTICIPANT_SUCCESS]: fetchTargetSuccess,
  [FETCH_PARTICIPANT_ERROR]: fetchError,
  [FETCH_PARTICIPANT_EXIST_REQUEST]: fetchExistRequest,
  [FETCH_PARTICIPANT_EXIST_SUCCESS]: fetchExistSuccess,
  [FETCH_PARTICIPANT_EXIST_ERROR]: fetchExistError
});
