import { POST_TYPE_JOIN } from '~/constants/post';

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
      createdAt: data.createdAt,
      userName: data.userDisplayName,
      userPhotoURL: data.userPhotoURL,
      userId: data.userId
    }
  };
};

const functionMap = new Map([
  [POST_TYPE_JOIN, (data: any) => createJoinPost(data)]
]);

export const createPost = (data: any) => {
  return (functionMap.get(data.verb) as any)(data);
};
