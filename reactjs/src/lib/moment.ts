import moment from 'moment';
import 'moment/locale/ja';

moment.locale('ja');

const now = new Date();

export const fromNow = (date: Date) => moment(date).fromNow() || '';
export const isClosed = (date: Date) => moment(date).diff(now, 'days') <= 0;

export const formatDatetime = (date: string) =>
  moment(date).format('MM月DD日 HH:mm');

export const formatDate = (date: string) => moment(date).format('MM月DD日');

export default moment;
