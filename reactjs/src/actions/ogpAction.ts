import { Dispatch } from 'redux';
import { SET_OGP_INFO, RESET_OGP_INFO } from '../constants/actionTypes';

export const setOgpInfo = (ogpInfo: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_OGP_INFO, payload: { ogpInfo } });
};

export const resetOgpInfo = () => (dispatch: Dispatch) => {
  dispatch({ type: RESET_OGP_INFO });
};
