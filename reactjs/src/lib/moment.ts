import moment from 'moment';

const now = new Date();

export const isClosed = (date: Date) => moment(date).diff(now, 'days') > 0;
