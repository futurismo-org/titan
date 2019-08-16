// import { Dispatch } from 'redux';
// import firebase from '~/lib/firebase';
import {
  FETCH_HISTORIES_REQUEST,
  FETCH_HISTORIES_SUCCESS,
  FETCH_HISTORIES_ERROR
} from '../constants/actionTypes';

import {
  fetchRequest,
  fetchSuccess,
  fetchError,
  // fetchTarget
  fetchItems
} from './actionUtil';

export const fetchHistoriesRequest = fetchRequest(FETCH_HISTORIES_REQUEST);
export const fetchHistoriesSuccess = fetchSuccess(FETCH_HISTORIES_SUCCESS);
export const fetchHistoriesError = fetchError(FETCH_HISTORIES_ERROR);

export const fetchHistories = (resourceId: string) => {
  return fetchItems(
    resourceId,
    fetchHistoriesRequest,
    fetchHistoriesSuccess,
    fetchHistoriesError
  );
};
