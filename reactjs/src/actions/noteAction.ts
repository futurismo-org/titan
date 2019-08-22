import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_NOTES_REQUEST,
  FETCH_NOTES_SUCCESS,
  FETCH_NOTES_ERROR,
  FETCH_NOTE_REQUEST,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_ERROR
} from '../constants/actionTypes';

import {
  fetchTarget,
  fetchRequest,
  fetchSuccess,
  fetchError,
  fetchItems
} from './actionUtil';

export const fetchNotesRequest = fetchRequest(FETCH_NOTES_REQUEST);
export const fetchNotesSuccess = fetchSuccess(FETCH_NOTES_SUCCESS);
export const fetchNotesError = fetchError(FETCH_NOTES_ERROR);
export const fetchNoteRequest = fetchRequest(FETCH_NOTE_REQUEST);
export const fetchNoteSuccess = fetchSuccess(FETCH_NOTE_SUCCESS);
export const fetchNoteError = fetchError(FETCH_NOTE_ERROR);

export const fetchUserNotes = (resourceId: string, userShortId: string) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchNotesRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .where('userId', '==', userShortId)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchNotesSuccess(data)))
      .catch((error: any) => dispatch(fetchNotesError(error)));
  };
};

export const fetchNotes = (resourceId: string) => {
  return fetchItems(
    resourceId,
    fetchNotesRequest,
    fetchNotesSuccess,
    fetchNotesError
  );
};

export const fetchNote = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchNoteRequest,
    fetchNoteSuccess,
    fetchNoteError
  );
};
