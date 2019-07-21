import { Dispatch } from 'redux';
import firebase from '~/lib/firebase';
import {
  FETCH_TOPICS_REQUEST,
  FETCH_TOPICS_SUCCESS,
  FETCH_TOPICS_ERROR,
  FETCH_TOPIC_REQUEST,
  FETCH_TOPIC_SUCCESS,
  FETCH_TOPIC_ERROR
} from '../constants/actionTypes';

import { fetchTarget } from './actionUtil';

export const fetchTopicsRequest = () => ({
  type: FETCH_TOPICS_REQUEST
});

export const fetchTopicsSuccess = (payload: any) => ({
  type: FETCH_TOPICS_SUCCESS,
  payload
});

export const fetchTopicsError = (error: any) => ({
  type: FETCH_TOPICS_ERROR,
  error: error
});

export const fetchTopicRequest = () => ({
  type: FETCH_TOPIC_REQUEST
});

export const fetchTopicSuccess = (payload: any) => ({
  type: FETCH_TOPIC_SUCCESS,
  payload
});

export const fetchTopicError = (error: any) => ({
  type: FETCH_TOPIC_ERROR,
  error: error
});

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
