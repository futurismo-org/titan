import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import Reactotron from '~/native/lib/reactotron';
import { createRootReducerForRN } from '~/reducers';

const initialState = {};

export const store = createStore(
  createRootReducerForRN(),
  initialState,
  compose(
    applyMiddleware(thunk)
    // @ts-ignore
    // Reactotron.createEnhancer()
  )
);
