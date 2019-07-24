import moment from '~/lib/moment';

export const challengePeriod = (challenge: any) => {
  const openedAt = moment(challenge.openedAt.toDate());
  const closedAt = moment(challenge.closedAt.toDate());
  const today = moment();

  if (openedAt.diff(today, 'days') > 0) {
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
    } else {
      return moment(closedAt).diff(openedAt, 'days') + 1;
    }
  }

  return moment(createdAt).isAfter(moment(openedAt))
    ? today.diff(createdAt, 'days') + 1
    : today.diff(openedAt, 'days') + 1;
};

export const getAchieveRate = (totalDays: number, accDays: number) =>
  totalDays === 0 ? 0 : Math.round(((accDays || 0) / totalDays) * 100);
