import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_PROFILES_REQUEST,
  FETCH_PROFILES_SUCCESS,
  FETCH_PROFILES_ERROR,
  FETCH_PROFILE_REQUEST,
  FETCH_PROFILE_SUCCESS,
  FETCH_PROFILE_ERROR,
  FETCH_PROFILE_REQUEST_SUB,
  FETCH_PROFILE_SUCCESS_SUB,
  FETCH_PROFILE_ERROR_SUB,
  RESET_PROFILES_INFO
} from '../constants/actionTypes';

import {
  fetchRequest,
  fetchSuccess,
  fetchError,
  fetchTarget,
  fetchItems,
  reset
} from './actionUtil';

export const fetchProfilesRequest = fetchRequest(FETCH_PROFILES_REQUEST);
export const fetchProfilesSuccess = fetchSuccess(FETCH_PROFILES_SUCCESS);
export const fetchProfilesError = fetchError(FETCH_PROFILES_ERROR);
export const fetchProfileRequest = fetchRequest(FETCH_PROFILE_REQUEST);
export const fetchProfileSuccess = fetchSuccess(FETCH_PROFILE_SUCCESS);
export const fetchProfileError = fetchError(FETCH_PROFILE_ERROR);
export const fetchProfileRequestSub = fetchRequest(FETCH_PROFILE_REQUEST_SUB);
export const fetchProfileSuccessSub = fetchSuccess(FETCH_PROFILE_SUCCESS_SUB);
export const fetchProfileErrorSub = fetchError(FETCH_PROFILE_ERROR_SUB);
export const resetProfilesInfo = reset(RESET_PROFILES_INFO);

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

export const fetchProfile = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileError
  );
};

export const fetchProfileCategory = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileError
  );
};

export const fetchProfileChallenge = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchProfileRequestSub,
    fetchProfileSuccessSub,
    fetchProfileErrorSub
  );
};

export const fetchProfileChallenges = (resourceId: string) => {
  return fetchItems(
    resourceId,
    fetchProfilesRequest,
    fetchProfilesSuccess,
    fetchProfilesError
  );
};

export const fetchCurrentChallengeIds = (resourceId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchProfileRequest());
    firebase
      .firestore()
      .doc(resourceId)
      .get()
      .then((snap: any) => snap.docs)
      .then(docs => docs.map((doc: any) => doc.id))
      .then((ids: any) => dispatch(fetchProfileSuccess(ids)))
      .catch((error: any) => dispatch(fetchProfileError(error)));
  };
};
