import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

export const now = new Date();
export const nowMoment = moment();

export const fromNow = (date: Date) => moment(date).fromNow() || '';
export const isClosed = (date: Date) => moment(date).diff(now, 'days') <= 0;
export const isToday = (date: Date) => moment(date).isSame(moment(now), 'days');

export const formatDatetime = (date: Date) =>
  moment(date).format('MM月DD日 HH:mm');
export const formatDate = (date: string) => moment(date).format('MM月DD日');

export const formatYearDate = (date: Date) => moment(date).format('YYYY/MM/DD');

export default moment;
