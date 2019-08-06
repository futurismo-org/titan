import * as actionTypes from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = {
  show: false
};

export const showSensitive = (state: any) => {
  return Object.assign({}, state, {
    show: true
  });
};

export const hideSensitive = (state: any) => {
  return Object.assign({}, state, {
    show: false
  });
};

export default createReducer(initialState, {
  [actionTypes.SHOW_SENSITIVE]: showSensitive,
  [actionTypes.HIDE_SENSITIVE]: hideSensitive
});
