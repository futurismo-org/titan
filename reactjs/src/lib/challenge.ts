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
