import { FETCH_CHALLENGES } from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

import firebase from '~/lib/firebase';

export const initialState = {};

export const fetchChallenges = (state: any, payload: any) => {
  return Object.assign({}, state, {
    challenges: firebase
      .firestore()
      .collection('challenges')
      .where('draft', '==', false)
      .orderBy('openedAt', 'desc')
      .limit(payload.num)
  });
};

export default createReducer(initialState, {
  [FETCH_CHALLENGES]: fetchChallenges
});
