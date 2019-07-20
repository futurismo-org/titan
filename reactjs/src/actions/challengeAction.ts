import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  FETCH_PINNED_CHALLENGES_SUCCESS,
  FETCH_PINNED_CHALLENGES_REQUEST,
  FETCH_PINNED_CHALLENGES_ERROR
} from '../constants/actionTypes';

export const fetchChallengesRequest = () => ({
  type: FETCH_CHALLENGES_REQUEST
});

export const fetchChallengesSuccess = (payload: any) => ({
  type: FETCH_CHALLENGES_SUCCESS,
  payload
});

export const fetchChallengesError = (error: any) => ({
  type: FETCH_CHALLENGES_ERROR,
  error: error
});

export const fetchPinnedChallengesRequest = () => ({
  type: FETCH_PINNED_CHALLENGES_REQUEST
});

export const fetchPinnedChallengesSuccess = (payload: any) => ({
  type: FETCH_PINNED_CHALLENGES_SUCCESS,
  payload
});

export const fetchPinnedChallengesError = (error: any) => ({
  type: FETCH_PINNED_CHALLENGES_ERROR,
  error: error
});

export const fetchChallenges = (num: number = 100) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchChallengesRequest());
    firebase
      .firestore()
      .collection('challenges')
      .where('draft', '==', false)
      .orderBy('openedAt', 'desc')
      .limit(num)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchChallengesSuccess(data)))
      .catch((error: any) => dispatch(fetchChallengesError(error)));
  };
};

export const fetchPinnedChallenges = () => {
  return (dispatch: Dispatch) => {
    dispatch(fetchPinnedChallengesRequest());
    firebase
      .firestore()
      .collection('challenges')
      .where('pinned', '==', true)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchPinnedChallengesSuccess(data)))
      .catch((error: any) => dispatch(fetchPinnedChallengesError(error)));
  };
};
