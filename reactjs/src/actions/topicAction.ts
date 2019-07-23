import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR,
  FETCH_TOPIC_REQUEST,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_ERROR,
  RESET_TOPIC_INFO
} from '../constants/actionTypes';

import {
  fetchTarget,
  fetchRequest,
  fetchSuccess,
  fetchError,
  reset
} from './actionUtil';

export const fetchTopicsRequest = fetchRequest(FETCH_TOPICS_REQUEST);
export const fetchTopicsSuccess = fetchSuccess(FETCH_TOPICS_SUCCESS);
export const fetchTopicsError = fetchError(FETCH_TOPICS_ERROR);
export const fetchTopicRequest = fetchRequest(FETCH_TOPIC_REQUEST);
export const fetchTopicSuccess = fetchSuccess(FETCH_TOPIC_SUCCESS);
export const fetchTopicError = fetchError(FETCH_TOPIC_ERROR);
export const resetTopicInfo = reset(RESET_TOPIC_INFO);

export const fetchTopics = (resourceId: string, num = 1000) => {
  return (dispatch: Dispatch) => {
    dispatch(fetchTopicsRequest());
    firebase
      .firestore()
      .collection(resourceId)
      .orderBy('updatedAt', 'desc')
      .limit(num)
      .get()
      .then((snap: any) => snap.docs.map((doc: any) => doc.data()))
      .then((data: any) => dispatch(fetchTopicsSuccess(data)))
      .catch((error: any) => dispatch(fetchTopicsError(error)));
  };
};

export const fetchTopic = (resourceId: string) => {
  return fetchTarget(
    resourceId,
    fetchTopicRequest,
    fetchTopicSuccess,
    fetchTopicError
  );
};
