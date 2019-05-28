import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import firebase from './lib/firebase';
import rootReducer from './reducers';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancer];

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )
);
