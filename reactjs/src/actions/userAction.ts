import { Dispatch } from 'redux';
import {
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_USER_REQUEST,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR
} from '../constants/actionTypes';

import firebase from '~/lib/firebase';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST
});

export const fetchUsersSuccess = (payload: any) => ({
  type: FETCH_USERS_SUCCESS,
  payload
});

export const fetchUsersError = (error: any) => ({
  type: FETCH_USERS_ERROR,
  error: error
});

export const fetchUserRequest = () => ({
  type: FETCH_USER_REQUEST
});

export const fetchUserSuccess = (payload: any) => ({
  type: FETCH_USER_SUCCESS,
  payload
});

export const fetchUserError = (error: any) => ({
  type: FETCH_USER_ERROR,
  error: error
});

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

export const fetchUser = (resourceId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchUsersRequest());
    firebase
      .firestore()
      .doc(resourceId)
      .get()
      .then((doc: any) => doc.data())
      .then((data: any) => dispatch(fetchUserSuccess(data)))
      .catch((error: any) => dispatch(fetchUserError(error)));
  };
};
