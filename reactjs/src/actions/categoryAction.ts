import { Dispatch } from 'redux';
import { firestore } from 'firebase';
import firebase from '~/lib/firebase';
import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORY_REQUEST,
  FETCH_CATEGORY_SUCCESS,
  FETCH_CATEGORY_ERROR,
  RESET_CATEGORY_INFO
} from '../constants/actionTypes';

import {
  fetchTarget,
  fetchRequest,
  fetchSuccess,
  fetchError,
  reset
} from './actionUtil';

export const fetchCategoriesRequest = fetchRequest(FETCH_CATEGORIES_REQUEST);
export const fetchCategoriesSuccess = fetchSuccess(FETCH_CATEGORIES_SUCCESS);
export const fetchCategoriesError = fetchError(FETCH_CATEGORIES_ERROR);
export const fetchCategoryRequest = fetchRequest(FETCH_CATEGORY_REQUEST);
export const fetchCategorySuccess = fetchSuccess(FETCH_CATEGORY_SUCCESS);
export const fetchCategoryError = fetchError(FETCH_CATEGORY_ERROR);
export const resetCategoryInfo = reset(RESET_CATEGORY_INFO);

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

export const fetchCategoriesWithRefs = (
  refs: [firestore.DocumentReference]
) => {
  return (dispatch: Dispatch) => {
    if (!refs) return;

    dispatch(fetchCategoriesRequest());

    const promises = refs.map(ref => ref.get().then(doc => doc.data()));

    Promise.all(promises)
      .then(data => dispatch(fetchCategoriesSuccess(data)))
      .catch(error => dispatch(fetchCategoriesError(error)));
  };
};

export const fetchProfileCategories = (userShortId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchCategoriesRequest());
    firebase
      .firestore()
      .collection('profiles')
      .doc(userShortId)
      .collection('categories')
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchCategoriesSuccess(data)))
      .catch((error: any) => dispatch(fetchCategoriesError(error)));
  };
};

export const fetchCategory = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchCategoryRequest,
    fetchCategorySuccess,
    fetchCategoryError
  );
};
