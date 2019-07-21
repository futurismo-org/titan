import { Dispatch } from 'redux';
import {
  SET_USER_INFO,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR
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
