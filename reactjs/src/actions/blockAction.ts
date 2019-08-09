import { Dispatch } from 'redux';
import {
  FETCH_BLOCKS_REQUEST,
  FETCH_BLOCKS_SUCCESS,
  FETCH_BLOCKS_ERROR
} from '../constants/actionTypes';

import { fetchRequest, fetchSuccess, fetchError } from './actionUtil';
import firebase from '~/lib/firebase';

export const fetchBlocksRequest = fetchRequest(FETCH_BLOCKS_REQUEST);
export const fetchBlocksSuccess = fetchSuccess(FETCH_BLOCKS_SUCCESS);
export const fetchBlocksError = fetchError(FETCH_BLOCKS_ERROR);

export const fetchBlockedUsers = (blockingUserId: string) => {
  return (dispatch: Dispatch) => {
    if (!blockingUserId || blockingUserId === '') return;

    const resourceId = `/blocks`;
    dispatch(fetchBlocksRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .get()
      .then(snap =>
        snap.docs.filter(doc => doc.data().blockingUserId === blockingUserId)
      )
      .then(docs => docs.map(doc => doc.data()))
      .then((data: any) => dispatch(fetchBlocksSuccess(data)))
      .catch((error: any) => dispatch(fetchBlocksError(error)));
  };
};

export const fetchBlockingUsers = (blockedUserId: string) => {
  return (dispatch: Dispatch) => {
    if (!blockedUserId || blockedUserId === '') return;

    const resourceId = `/blocks`;
    dispatch(fetchBlocksRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .get()
      .then(snap =>
        snap.docs.filter(doc => doc.data().blockedUserId === blockedUserId)
      )
      .then(docs => docs.map(doc => doc.data()))
      .then((data: any) => dispatch(fetchBlocksSuccess(data)))
      .catch((error: any) => dispatch(fetchBlocksError(error)));
  };
};
