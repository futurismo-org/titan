import { Dispatch } from 'redux';
import {
  FETCH_MUTES_REQUEST,
  FETCH_MUTES_SUCCESS,
  FETCH_MUTES_ERROR
} from '../constants/actionTypes';

import { fetchRequest, fetchSuccess, fetchError } from './actionUtil';
import firebase from '~/lib/firebase';

export const fetchMutesRequest = fetchRequest(FETCH_MUTES_REQUEST);
export const fetchMutesSuccess = fetchSuccess(FETCH_MUTES_SUCCESS);
export const fetchMutesError = fetchError(FETCH_MUTES_ERROR);

export const fetchMutes = (myUserId: string) => {
  return (dispatch: Dispatch) => {
    const resourceId = `/mutes/${myUserId}/users`;
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
