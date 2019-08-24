import { createStore } from 'redux';
import { createBrowserHistory } from 'history';
import { createRootReducerForRN } from '~/reducers';

export const history = createBrowserHistory();

const initialState = {};
export const store = createStore(createRootReducerForRN(), initialState);
