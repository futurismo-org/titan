import * as actionTypes from '../constants/actionTypes';
import { createReducer } from './reducuerUtil';

export const initialState = {
  show: false,
  type: ''
};

export const showGiphy = (state: any, payload: any) => {
  return Object.assign({}, state, {
    show: true,
    type: payload.type
  });
};

export const hideGiphy = (state: any) => {
  return Object.assign({}, state, initialState);
};

export default createReducer(initialState, {
  [actionTypes.SHOW_GIPHY]: showGiphy,
  [actionTypes.HIDE_GIPHY]: hideGiphy
});
