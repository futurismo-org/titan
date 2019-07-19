import { Dispatch } from 'redux';
import firebase from 'lib/firebase';
import {
  FETCH_CHALLENGES_REQUEST,
  FETCH_CHALLENGES_SUCCESS,
  FETCH_CHALLENGES_ERROR
} from '../constants/actionTypes';

export const fetchChallengesRequest = () => ({
  type: FETCH_CHALLENGES_REQUEST
});

export const fetchChallengesSuccess = (challenges: any) => ({
  type: FETCH_CHALLENGES_SUCCESS,
  payload: challenges
});

export const fetchChallengesError = (error: any) => ({
  type: FETCH_CHALLENGES_ERROR,
  error: error
});

export const fetchChallenges = (num: number = 20) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchChallengesRequest());
    firebase
      .firestore()
      .collection('challenges')
      .where('draft', '==', false)
      .orderBy('openedAt', 'desc')
      .limit(num)
      .get()
      .then(snap => snap.docs.map(doc => doc.data()))
      .then(data => dispatch(fetchChallengesSuccess(data)))
      .catch(error => dispatch(fetchChallengesError(error)));
  };
};
