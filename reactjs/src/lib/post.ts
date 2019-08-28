import { domainToASCII } from 'url';
import {
  POST_TYPE_JOIN,
  POST_TYPE_NOTE,
  POST_TYPE_TOPIC,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_OBJECTIVE
} from '~/constants/post';

const baseData = (data: any) => {
  return {
    id: data.id,
    type: data.verb,
    timestamp: data.time
  };
};

const createJoinPost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      timestamp: data.time,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const createTopicPost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      timestamp: data.time,
      title: data.title,
      path: data.path,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const createNotePost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      challengeId: data.challengeId,
      noteId: data.noteId,
      text: data.text,
      type: data.verb,
      timestamp: data.time,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const createHistoryPost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      challengeId: data.challengeId,
      historyId: data.historyId,
      type: data.verb,
      timestamp: data.time,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId,
      days: data.days || 0
    }
  };
};

const createObjectivePost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      challengeId: data.challengeId,
      historyId: data.historyId,
      type: data.verb,
      timestamp: data.time,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const functionMap = new Map([
  [POST_TYPE_JOIN, (data: any) => createJoinPost(data)],
  [POST_TYPE_TOPIC, (data: any) => createTopicPost(data)],
  [POST_TYPE_NOTE, (data: any) => createNotePost(data)],
  [POST_TYPE_RECORD, (data: any) => createHistoryPost(data)],
  [POST_TYPE_RESET, (data: any) => createHistoryPost(data)],
  [POST_TYPE_OBJECTIVE, (data: any) => createObjectivePost(data)]
]);

export const createPost = (data: any) => {
  return (functionMap.get(data.verb) as any)(data);
};
