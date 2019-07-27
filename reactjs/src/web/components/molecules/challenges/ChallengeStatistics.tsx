import * as React from 'react';

import { Grid } from '@material-ui/core';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

import { getTotalDays, getAchieveRate } from '~/lib/challenge';

const ChallengeStatistics = (props: any) => {
  const { data, openedAt, closedAt } = props;

  const totalDays = getTotalDays(openedAt.toDate(), closedAt.toDate(), data);
  const achieveRate = getAchieveRate(totalDays, data.accDays);

  return (
    <Grid container spacing={3}>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="スコア" number={data.score} unit="" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="達成率" number={achieveRate} unit="%" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget
          title="大会累積日数"
          number={data.accDays || 0}
          unit="days"
        />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="大会連続日数" number={data.days} unit="days" />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget
          title="過去連続日数"
          number={data.pastDays || data.days}
          unit="days"
        />
      </Grid>
      <Grid item lg={4} md={4} sm={6} xs={6}>
        <NumberWidget title="経過日数" number={totalDays} unit="days" />
      </Grid>
    </Grid>
  );
};

export default ChallengeStatistics;
