import { Dispatch } from 'redux';
import {
  FETCH_MUTES_REQUEST,
  FETCH_MUTES_SUCCESS,
  FETCH_MUTES_ERROR,
  FETCH_BLOCKS_REQUEST,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_ERROR
} from '../constants/actionTypes';

import { fetchRequest, fetchSuccess, fetchError } from './actionUtil';
import firebase from '~/lib/firebase';

export const fetchMutesRequest = fetchRequest(FETCH_MUTES_REQUEST);
export const fetchMutesSuccess = fetchSuccess(FETCH_MUTES_SUCCESS);
export const fetchMutesError = fetchError(FETCH_MUTES_ERROR);
export const fetchBlocksRequest = fetchRequest(FETCH_BLOCKS_REQUEST);
export const fetchBlocksSuccess = fetchSuccess(FETCH_BLOCKS_SUCCESS);
export const fetchBlocksError = fetchError(FETCH_BLOCKS_ERROR);

export const fetchMutes = (userId: string) => {
  return (dispatch: Dispatch) => {
    const resourceId = `/securities/${userId}/mutes`;
    dispatch(fetchMutesRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchMutesSuccess(data)))
      .catch((error: any) => dispatch(fetchMutesError(error)));
  };
};

export const fetchBlocks = (userId: string) => {
  return (dispatch: Dispatch) => {
    const resourceId = `/securities/${userId}/blocks`;
    dispatch(fetchBlocksRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchBlocksSuccess(data)))
      .catch((error: any) => dispatch(fetchBlocksError(error)));
  };
};
