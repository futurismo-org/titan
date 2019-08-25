import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createRootReducerForRN } from '~/reducers';

import reactotron from '~/native/lib/reactotron';

const initialState = {};

export const store = createStore(
  createRootReducerForRN(),
  initialState,
  compose(
    applyMiddleware(thunk),
    reactotron.createEnhancer()
  )
);
