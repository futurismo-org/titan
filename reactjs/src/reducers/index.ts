import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import userReducer from './userReducer';
import ogpReducer from './ogpReducer';
import challengeReducer from './challengeReducer';
import categoryReducer from './categoryReducer';
import topicReducer from './topicReducer';
import giphyReducer from './gitphyReducer';
import sensitiveReducer from './sensitiveReducer';

export const createRootReducer = (history: any) =>
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: userReducer,
    ogp: ogpReducer,
    challenge: challengeReducer,
    category: categoryReducer,
    topic: topicReducer,
    sensitive: sensitiveReducer
  });

export const createRootReducerForRN = () =>
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: userReducer,
    challenge: challengeReducer,
    category: categoryReducer,
    topic: topicReducer,
    giphy: giphyReducer
  });
