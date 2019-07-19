import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR
} from '../constants/actionTypes';

export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST
});

export const fetchCategoriesSuccess = (payload: any) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload
});

export const fetchCategoriesError = (error: any) => ({
  type: FETCH_CATEGORIES_ERROR,
  error: error
});

export const fetchCategories = (num: number = 20) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchCategoriesRequest());
    firebase
      .firestore()
      .collection('categories')
      .orderBy('updatedAt', 'desc')
      .limit(num)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchCategoriesSuccess(data)))
      .catch((error: any) => dispatch(fetchCategoriesError(error)));
  };
};
