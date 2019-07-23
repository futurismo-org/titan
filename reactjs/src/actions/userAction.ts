import { Dispatch } from 'redux';
import {
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  RESET_USER_INFO
} from '../constants/actionTypes';

import {
  fetchTarget,
  fetchRequest,
  fetchSuccess,
  fetchError,
  reset
} from './actionUtil';
import firebase from '~/lib/firebase';

export const fetchUsersRequest = fetchRequest(FETCH_USERS_REQUEST);
export const fetchUsersSuccess = fetchSuccess(FETCH_USERS_SUCCESS);
export const fetchUsersError = fetchError(FETCH_USERS_ERROR);
export const fetchUserRequest = fetchRequest(FETCH_USER_REQUEST);
export const fetchUserSuccess = fetchSuccess(FETCH_USER_SUCCESS);
export const fetchUserError = fetchError(FETCH_USER_ERROR);
export const resetUserInfo = reset(RESET_USER_INFO);

export const setUserInfo = (userInfo: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_USER_INFO, payload: { userInfo } });
};

export const fetchUsers = (num: number = 1000) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUsersRequest());
    firebase
      .firestore()
      .collection('users')
      .orderBy('updatedAt', 'desc')
      .limit(num)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchUsersSuccess(data)))
      .catch((error: any) => dispatch(fetchUsersError(error)));
  };
};

export const fetchParticipants = (resourceId: string, num: number = 1000) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUsersRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .limit(num)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchUsersSuccess(data)))
      .catch((error: any) => dispatch(fetchUsersError(error)));
  };
};

export const fetchUser = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchUserRequest,
    fetchUserSuccess,
    fetchUserError
  );
};
