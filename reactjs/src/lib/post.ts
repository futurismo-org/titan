import { domainToASCII } from 'url';
import {
  POST_TYPE_JOIN,
  POST_TYPE_NOTE,
  POST_TYPE_TOPIC
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
      path: `/c/${data.challengeId}/t/${data.topicId}`,
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
      timestamp: data.createdAt,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const functionMap = new Map([
  [POST_TYPE_JOIN, (data: any) => createJoinPost(data)],
  [POST_TYPE_TOPIC, (data: any) => createTopicPost(data)],
  [POST_TYPE_NOTE, (data: any) => createNotePost(data)]
]);

export const createPost = (data: any) => {
  return (functionMap.get(data.verb) as any)(data);
};
