import { createStore, applyMiddleware, compose } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { createRootReducer } from '~/reducers';
import firebase from '~/lib/firebase';

import reactotron from '~/web/lib/reactotron';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

export const history = createBrowserHistory();

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancer];

export const store = createStore(
  createRootReducer(history),
  compose(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
    reactotron.createEnhancer!()
  )
);
