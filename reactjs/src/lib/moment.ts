import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

export const nowMoment = moment();

export const fromNow = (date: Date) => moment(date).fromNow() || '';
export const isClosed = (date: Date) =>
  moment(date).diff(new Date(), 'days') <= 0;
export const isToday = (date: Date) =>
  moment(date).isSame(moment(new Date()), 'days');
export const isBeforeInDaysFromNow = (date: Date, days: number) => {
  const isBefore = moment(date).isBefore(new Date());
  const diff = moment(new Date()).diff(date, 'days');
  return isBefore && diff <= days;
};

export const getBeforeDateFromNow = (days: number) =>
  moment(new Date())
    .subtract(days, 'days')
    .toDate();

export const formatDatetime = (date: Date) =>
  moment(date).format('MM月DD日 HH:mm');
export const formatDate = (date: Date) => moment(date).format('MM月DD日');
export const formatDateShort = (date: Date): string =>
  moment(date).format('MM/DD');
export const formatDatetimeShort = (date: Date): string =>
  moment(date).format('MM/DD HH:mm');

export const formatYearDate = (date: Date) => moment(date).format('YYYY/MM/DD');
export const formatYearDateLong = (date: Date) =>
  moment(date).format('YYYY年MM月DD日');

export const formatYearMonth = (date: Date) => moment(date).format('YYYY/MM');

export const toISOLocalString = (d: Date) => {
  var z = (n: number) => (n < 10 ? '0' : '') + n;
  var off = d.getTimezoneOffset();
  var sign = off < 0 ? '+' : '-';
  off = Math.abs(off);

  return (
    d.getFullYear() +
    '-' +
    z(d.getMonth() + 1) +
    '-' +
    z(d.getDate()) +
    'T' +
    z(d.getHours()) +
    ':' +
    z(d.getMinutes()) +
    ':' +
    z(d.getSeconds()) +
    sign +
    z((off / 60) | 0) +
    z(off % 60)
  );
};

export default moment;
