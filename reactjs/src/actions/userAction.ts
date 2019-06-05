import { Dispatch } from 'redux';
import { SET_USER_INFO } from '../constants/actionTypes';

export const setUserInfo = (userInfo: any) => (dispatch: Dispatch) => {
  dispatch({ type: SET_USER_INFO, payload: { userInfo } });
};
