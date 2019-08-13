import moment, { nowMoment } from '~/lib/moment';
import firebase from '~/lib/firebase';

export const RECORD = 'RECORD';
export const RESET = 'RESET';

export const challengePeriod = (challenge: any) => {
  const openedAt = moment(challenge.openedAt.toDate());
  const closedAt = moment(challenge.closedAt.toDate());
  const today = moment();

  if (openedAt.diff(today, 'days') >= 0) {
    return `${openedAt.fromNow()}に開始`;
  }
  return `${closedAt.fromNow()}に終了`;
};

export const getTotalDays = (
  openedAt: Date,
  closedAt: Date,
  participant: any
) => {
  const today = moment();
  const createdAt = participant.createdAt.toDate();

  if (today.isBefore(openedAt)) {
    return 0;
  }

  if (today.isAfter(closedAt)) {
    if (moment(createdAt).isAfter(moment(openedAt))) {
      return moment(closedAt).diff(createdAt, 'days') + 1;
    }
    return moment(closedAt).diff(openedAt, 'days') + 1;
  }

  return moment(createdAt).isAfter(moment(openedAt))
    ? today.diff(createdAt, 'days') + 1
    : today.diff(openedAt, 'days') + 1;
};

export const getAchieveRate = (totalDays: number, accDays: number) =>
  totalDays === 0 ? 0 : Math.round(((accDays || 0) / totalDays) * 100);

export const isDaysValid = (days: number) => {
  return days !== undefined && days !== null && !isNaN(days);
};

export const formatDays = (days: any) => {
  if (!isDaysValid(days)) {
    return 0;
  }
  return days;
};

export const isChallengeClosed = (closedAt: Date) =>
  moment(new Date().setHours(29, 59, 59, 59)).diff(moment(closedAt), 'days') >
  0;

export const isChallengeOpening = (openedAt: Date, closedAt: Date) =>
  nowMoment.diff(moment(openedAt)) >= 0 && nowMoment.diff(moment(closedAt)) < 0;

export const rankChallengeParticipants = (participants: any) => {
  const users = participants.sort(
    (x: any, y: any) =>
      y.score - x.score ||
      y.days - x.days ||
      y.maxDays - x.maxDays ||
      y.updatedAt.toDate() - x.updatedAt.toDate()
  );

  const size = users.length;

  const isSameScore = (users: any, i: number) =>
    users[i - 1].score === users[i].score &&
    users[i - 1].days === users[i].days &&
    users[i - 1].maxDays === users[i].maxDays;

  const rankings = new Array(size);
  rankings[0] = 1;
  for (let i = 1; i < size; i += 1) {
    rankings[i] = isSameScore(users, i) ? rankings[i - 1] : i + 1;
  }

  const rankedUsers = new Array(size);

  for (let i = 0; i < size; i += 1) {
    rankedUsers[i] = { rank: rankings[i], ...users[i] };
  }

  return rankedUsers;
};

export const aggregateChallenge = async (challengeId: string) => {
  console.log('challenge aggregation end', challengeId);

  const rankedUsers = await firebase
    .firestore()
    .collection('challenge')
    .doc(challengeId)
    .collection('participants')
    .get()
    .then(snap => snap.docs.map(doc => doc.data()))
    .then(participants => rankChallengeParticipants(participants));

  await firebase
    .firestore()
    .collection('challenge')
    .doc(challengeId)
    .update({
      participants: rankedUsers
    });

  const challengeResults = await rankedUsers.map(user => ({
    challengeId,
    userId: user.id,
    score: user.score,
    rank: user.rank
  }));
};
