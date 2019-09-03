import {
  brandDarkBlue,
  brandAqua,
  secondaryColor,
  brandWhite,
  brandPurple,
  brandSuccess,
  brandWarning,
  brandPink,
  brandYellow,
  brandDark
} from './theme';
import {
  POST_MESSAGE_OBJECTIVE,
  POST_MESSAGE_RECORD,
  POST_TYPE_ANALYSIS,
  POST_TYPE_SUCCESS,
  POST_TYPE_JOIN,
  POST_TYPE_NOTE,
  POST_TYPE_TOPIC,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_OBJECTIVE,
  POST_MESSAGE_JOIN,
  POST_MESSAGE_TOPIC,
  POST_MESSAGE_RESET,
  POST_MESSAGE_NOTE
} from '../constants/post';

import { getChallengeDashboardPath } from './url';

export const dummyImage = (
  backgroundColor: string,
  color: string,
  text: string
) => {
  const back = backgroundColor.replace('#', '');
  const front = color.replace('#', '');
  const size = '50x50';

  return `https://dummyimage.com/${size}/${back}/${front}&text=${text}`;
};

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
      userId: data.userId,
      dummyImage: dummyImage(secondaryColor, brandWhite, 'join'),
      message: POST_MESSAGE_JOIN,
      avatarPath: `/u/${data.userId}`
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
      userId: data.userId,
      dummyImage: dummyImage(brandPurple, brandWhite, 'topic'),
      message: POST_MESSAGE_TOPIC,
      text: data.title,
      avatarPath: `/u/${data.userId}`
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
      rawData: data,
      dummyImage: dummyImage(brandPink, brandWhite, 'note'),
      message: POST_MESSAGE_NOTE,
      avatarPath: `/u/${data.userId}`
    }
  };
};

const createSuccessPost = (data: any) => {
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
      rawData: data,
      dummyImage: dummyImage(brandYellow, brandDark, 'win'),
      message: POST_MESSAGE_NOTE,
      avatarPath: `/u/${data.userId}`
    }
  };
};

const createAnalysisPost = (data: any) => {
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
      rawData: data,
      dummyImage: dummyImage(brandDarkBlue, brandWhite, 'study'),
      message: POST_MESSAGE_NOTE,
      avatarPath: `/u/${data.userId}`
    }
  };
};

const createRecordPost = (data: any) => {
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
      days: data.days || 0,
      dummyImage: dummyImage(brandSuccess, brandWhite, 'record'),
      message: POST_MESSAGE_RECORD,
      path: getChallengeDashboardPath(data.challengeId, data.userId),
      avatarPath: `/u/${data.userId}`
    }
  };
};

const createResetPost = (data: any) => {
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
      days: data.days || 0,
      dummyImage: dummyImage(brandWarning, brandWhite, 'reset'),
      message: POST_MESSAGE_RESET,
      path: getChallengeDashboardPath(data.challengeId, data.userId),
      avatarPath: `/u/${data.userId}`
    }
  };
};

const createObjectivePost = (data: any) => {
  return {
    ...baseData(data),
    data: {
      challengeId: data.challengeId,
      serverId: data.id,
      type: data.verb,
      timestamp: data.createdAt,
      objectiveId: data.objectiveId,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId,
      path: `/c/${data.challengeId}/u/${data.userId}/goal`,
      dummyImage: dummyImage(brandAqua, brandDark, 'goal'),
      message: POST_MESSAGE_OBJECTIVE,
      text: data.what,
      avatarPath: `/u/${data.userId}`
    }
  };
};

const functionMap = new Map([
  [POST_TYPE_JOIN, (data: any) => createJoinPost(data)],
  [POST_TYPE_TOPIC, (data: any) => createTopicPost(data)],
  [POST_TYPE_NOTE, (data: any) => createNotePost(data)],
  [POST_TYPE_ANALYSIS, (data: any) => createAnalysisPost(data)],
  [POST_TYPE_SUCCESS, (data: any) => createSuccessPost(data)],
  [POST_TYPE_RECORD, (data: any) => createRecordPost(data)],
  [POST_TYPE_RESET, (data: any) => createResetPost(data)],
  [POST_TYPE_OBJECTIVE, (data: any) => createObjectivePost(data)]
]);

export const createPost = (data: any) => {
  return (functionMap.get(data.verb) as any)(data);
};
