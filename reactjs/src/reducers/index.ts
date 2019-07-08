import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import userReducer from './userReducer';
import ogpReducer from './ogpReducer';

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  user: userReducer,
  ogp: ogpReducer
});

export default rootReducer;
