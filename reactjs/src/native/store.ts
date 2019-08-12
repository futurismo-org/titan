import { createStore, applyMiddleware, compose } from 'redux';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import { createRootReducerForRN } from '~/reducers';
import firebase from '~/lib/firebase';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancer];

export const store = createStore(
  createRootReducerForRN(),
  compose(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )
);
