import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

export const now = new Date();
export const nowMoment = moment();

export const fromNow = (date: Date) => moment(date).fromNow() || '';
export const isClosed = (date: Date) => moment(date).diff(now, 'days') <= 0;
export const isToday = (date: Date) => moment(date).isSame(moment(now), 'days');
export const isBeforeInDaysFromNow = (date: Date, days: number) => {
  const isBefore = moment(date).isBefore(now);
  const diff = moment(now).diff(date, 'days');
  return isBefore && diff <= days;
};

export const formatDatetime = (date: Date) =>
  moment(date).format('MM月DD日 HH:mm');
export const formatDate = (date: Date) => moment(date).format('MM月DD日');
export const formatDateShort = (date: Date): string =>
  moment(date).format('MM/DD');
export const formatDatetimeShort = (date: Date): string =>
  moment(date).format('MM/DD HH:mm');

export const formatYearDate = (date: Date) => moment(date).format('YYYY/MM/DD');

export default moment;
