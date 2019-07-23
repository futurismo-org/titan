import { Dispatch } from 'redux';
import { firestore } from 'firebase';
import {
  RESET_CHALLENGE_INFO,
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR,
  FETCH_CHALLENGE_REQUEST,
  FETCH_CHALLENGE_SUCCESS,
  FETCH_CHALLENGE_ERROR,
  FETCH_PINNED_CHALLENGES_SUCCESS,
  FETCH_PINNED_CHALLENGES_REQUEST,
  FETCH_PINNED_CHALLENGES_ERROR
} from '../constants/actionTypes';
import firebase from '~/lib/firebase';

import {
  fetchTarget,
  fetchRequest,
  fetchSuccess,
  fetchError,
  reset
} from './actionUtil';

export const fetchChallengesRequest = fetchRequest(FETCH_CHALLENGES_REQUEST);
export const fetchChallengesSuccess = fetchSuccess(FETCH_CHALLENGES_SUCCESS);
export const fetchChallengesError = fetchError(FETCH_CHALLENGES_ERROR);
export const fetchChallengeRequest = fetchRequest(FETCH_CHALLENGE_REQUEST);
export const fetchChallengeSuccess = fetchSuccess(FETCH_CHALLENGE_SUCCESS);
export const fetchChallengeError = fetchError(FETCH_CHALLENGE_ERROR);
export const fetchPinnedChallengesRequest = fetchRequest(
  FETCH_PINNED_CHALLENGES_REQUEST
);
export const fetchPinnedChallengesSuccess = fetchSuccess(
  FETCH_PINNED_CHALLENGES_SUCCESS
);
export const fetchPinnedChallengesError = fetchError(
  FETCH_PINNED_CHALLENGES_ERROR
);
export const resetChallengeInfo = reset(RESET_CHALLENGE_INFO);

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

export const fetchChallengesWithRefs = (
  refs: [firestore.DocumentReference]
) => {
  return (dispatch: Dispatch) => {
    if (!refs) return;

    dispatch(fetchChallengesRequest());

    const promises = refs.map(ref => ref.get().then(doc => doc.data()));

    Promise.all(promises)
      .then(data => dispatch(fetchChallengesSuccess(data)))
      .catch(error => dispatch(fetchChallengesError(error)));
  };
};

export const fetchChallenge = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchChallengeRequest,
    fetchChallengeSuccess,
    fetchChallengeError
  );
};
