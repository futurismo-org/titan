export const getParticipantsUserId = (
  challengeId: string,
  userShortId: string
) => `challenges/${challengeId}/participants/${userShortId}`;

export const getTopicsId = (
  collection: 'general' | 'challenges' | 'categories',
  collectionId?: string
) =>
  collection === 'general'
    ? `/topics`
    : `/${collection}/${collectionId}/topics`;
