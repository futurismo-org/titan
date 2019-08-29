import {
  POST_TYPE_ANALYSIS,
  POST_TYPE_SUCCESS,
  POST_TYPE_JOIN,
  POST_TYPE_NOTE,
  POST_TYPE_TOPIC,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_OBJECTIVE,
  POST_TYPE_INIT
} from '../constants/post';

const baseData = (data: any) => {
  return {
    id: data.id,
    type: data.verb,
    timestamp: data.createdAt
  };
};

const createJoinPost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      timestamp: data.createdAt,
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
      timestamp: data.createdAt,
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
      serverId: data.id,
      text: data.text,
      type: data.verb,
      timestamp: data.createdAt,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId,
      rawData: data
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
      timestamp: data.createdAt,
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
      type: data.verb,
      timestamp: data.createdAt,
      objectiveId: data.objectiveId,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const createInitPost = (data: any) => {
  return {
    ...baseData(data)
  };
};

const functionMap = new Map([
  [POST_TYPE_JOIN, (data: any) => createJoinPost(data)],
  [POST_TYPE_TOPIC, (data: any) => createTopicPost(data)],
  [POST_TYPE_NOTE, (data: any) => createNotePost(data)],
  [POST_TYPE_ANALYSIS, (data: any) => createNotePost(data)],
  [POST_TYPE_SUCCESS, (data: any) => createNotePost(data)],
  [POST_TYPE_RECORD, (data: any) => createHistoryPost(data)],
  [POST_TYPE_RESET, (data: any) => createHistoryPost(data)],
  [POST_TYPE_OBJECTIVE, (data: any) => createObjectivePost(data)],
  [POST_TYPE_INIT, (data: any) => createInitPost(data)]
]);

export const createPost = (data: any) => {
  return (functionMap.get(data.verb) as any)(data);
};
