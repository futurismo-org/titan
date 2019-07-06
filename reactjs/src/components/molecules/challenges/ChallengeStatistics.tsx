import * as React from 'react';

import { Grid } from '@material-ui/core';
import moment from 'moment';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

const getTotalDays = (openedAt: Date, closedAt: Date, challenge: any) => {
  const today = moment();

  return today.isAfter(openedAt)
    ? moment(closedAt).diff(openedAt, 'days') + 1
    : moment(challenge.createdAt.toDate()).isAfter(moment(openedAt))
    ? today.diff(challenge.createdAt.toDate(), 'days') + 1
    : today.diff(openedAt, 'days') + 1;
};

const ChallengeStatistics = (props: any) => {
  const { data, openedAt, closedAt } = props;

  const totalDays = getTotalDays(openedAt.toDate(), closedAt.toDate(), data);

  const achieveRate = Math.round(((data.accDays || 0) / totalDays) * 100);

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="スコア" number={data.score} unit="" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="達成率" number={achieveRate} unit="%" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="累積日数" number={data.accDays || 0} unit="days" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="連続日数" number={data.days} unit="days" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="最長日数" number={data.maxDays} unit="days" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="経過日数" number={totalDays} unit="days" />
      </Grid>
    </Grid>
  );
};

export default ChallengeStatistics;
