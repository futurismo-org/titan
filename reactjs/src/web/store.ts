import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { createRootReducer } from '~/reducers';

export const history = createBrowserHistory();

const initialState = {};

export const store = createStore(
  createRootReducer(history),
  initialState,
  composeWithDevTools(applyMiddleware(thunk))
);
