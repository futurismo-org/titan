import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR
} from '../constants/actionTypes';

import { fetchRequest, fetchSuccess, fetchError } from './actionUtil';

export const fetchProfilesRequest = fetchRequest(FETCH_PROFILES_REQUEST);
export const fetchProfilesSuccess = fetchSuccess(FETCH_PROFILES_SUCCESS);
export const fetchProfilesError = fetchError(FETCH_PROFILES_ERROR);
export const fetchProfileRequest = fetchRequest(FETCH_PROFILE_REQUEST);
export const fetchProfileSuccess = fetchSuccess(FETCH_PROFILE_SUCCESS);
export const fetchProfileError = fetchError(FETCH_PROFILE_ERROR);

export const fetchProfiles = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchProfilesRequest());
    firebase
      .firestore()
      .collection('profiles')
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchProfilesSuccess(data)))
      .catch((error: any) => dispatch(fetchProfilesError(error)));
  };
};

export const fetchProfileCategory = (resourceId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchProfileRequest());
    firebase
      .firestore()
      .doc(resourceId)
      .get()
      .then((doc: any) => doc.data())
      .then((data: any) => dispatch(fetchProfileSuccess(data)))
      .catch((error: any) => dispatch(fetchProfileError(error)));
  };
};
