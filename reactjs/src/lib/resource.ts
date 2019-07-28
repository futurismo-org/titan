export const getParticipantsId = (challengeId: string) =>
  `/challenges/${challengeId}/participants`;

export const getParticipantsUserId = (
  challengeId: string,
  userShortId: string
) => `/challenges/${challengeId}/participants/${userShortId}`;

export const getTopicsId = (
  collection: 'general' | 'challenges' | 'categories',
  collectionId?: string
) =>
  collection === 'general'
    ? `/topics`
    : `/${collection}/${collectionId}/topics`;

export const getTopicId = (
  topicId: string,
  collection: 'general' | 'challenges' | 'categories',
  collectionId?: string
) =>
  collection === 'general'
    ? `/topics/${topicId}`
    : `/${collection}/${collectionId}/topics/${topicId}`;
