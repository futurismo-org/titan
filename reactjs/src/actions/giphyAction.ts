import { Dispatch } from 'redux';
import { SHOW_GIPHY, HIDE_GIPHY } from '../constants/actionTypes';

export const showGiphy = (type: string) => (dispatch: Dispatch) => {
  dispatch({ type: SHOW_GIPHY, payload: { type } });
};

export const hideGiphy = (show: boolean) => (dispatch: Dispatch) => {
  dispatch({ type: HIDE_GIPHY });
};
