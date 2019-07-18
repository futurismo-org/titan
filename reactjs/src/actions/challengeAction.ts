import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import { FETCH_CHALLENGES } from '../constants/actionTypes';

export const fetchChallenges = (num: number) => (dispatch: Dispatch) => {
  dispatch({ type: FETCH_CHALLENGES, payload: { num } });
};

// export const fetchChallenges = (num: number) => {
//   firebase
//     .firestore()
//     .collection('challenges')
//     .where('draft', '==', false)
//     .orderBy('openedAt', 'desc')
//     .limit(num);
// };
