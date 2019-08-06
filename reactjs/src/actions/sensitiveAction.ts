import { Dispatch } from 'redux';
import { SHOW_SENSITIVE, HIDE_SENSITIVE } from '../constants/actionTypes';

export const showSensitive = () => (dispatch: Dispatch) => {
  dispatch({ type: SHOW_SENSITIVE });
};

export const hideSensitive = () => (dispatch: Dispatch) => {
  dispatch({ type: HIDE_SENSITIVE });
};
