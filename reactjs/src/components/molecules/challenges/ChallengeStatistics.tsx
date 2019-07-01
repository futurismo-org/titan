import * as React from 'react';

import { Grid } from '@material-ui/core';
import moment from 'moment';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

const ChallengeStatistics = (props: any) => {
  const { data, openedAt, closedAt } = props;

  const today = moment();

  const totalDays = today.isAfter(closedAt.toDate())
    ? moment(closedAt.toDate()).diff(openedAt.toDate(), 'days')
    : moment(data.createdAt).isAfter(openedAt.toDate())
    ? today.diff(data.createdAt, 'days')
    : today.diff(openedAt.toDate(), 'days');

  const achieveRate =
    totalDays === 0 ? 0 : Math.round((data.accDays / totalDays) * 100);

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="スコア" number={data.score} unit="" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="達成率" number={achieveRate} unit="%" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="累積日数" number={data.accDays} unit="days" />
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
