import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import firebase from 'lib/firebase';
import createRootReducer from 'reducers';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
};

export const history = createBrowserHistory();

const middlewares = [
  thunk.withExtraArgument({ getFirebase, getFirestore }),
  routerMiddleware(history)
];
const middlewareEnhancer = applyMiddleware(...middlewares);
const storeEnhancers = [middlewareEnhancer];

export const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    ...storeEnhancers,
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
  )
);
