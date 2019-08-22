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
import muteReducer from './muteReducer';
import blockReducer from './blockReducer';
import profileReducer from './profileReducer';
import historyReducer from './historyReducer';
import objectiveReducer from './objectiveReducer';
import participantReducer from './participantReducer';
import noteReducer from './noteReducer';

export const createRootReducer = (history: any) =>
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: userReducer,
    ogp: ogpReducer,
    challenge: challengeReducer,
    category: categoryReducer,
    topic: topicReducer,
    sensitive: sensitiveReducer,
    mute: muteReducer,
    block: blockReducer,
    profile: profileReducer,
    history: historyReducer,
    objective: objectiveReducer,
    participant: participantReducer,
    note: noteReducer
  });

export const createRootReducerForRN = () =>
  combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    user: userReducer,
    challenge: challengeReducer,
    category: categoryReducer,
    topic: topicReducer,
    giphy: giphyReducer,
    mute: muteReducer,
    block: blockReducer,
    profile: profileReducer,
    history: historyReducer,
    objective: objectiveReducer,
    participant: participantReducer,
    note: noteReducer
  });
