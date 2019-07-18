export const getParticipantsUserId = (
  challengeId: string,
  userShortId: string
) => `challenges/${challengeId}/participants/${userShortId}`;
