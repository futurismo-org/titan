import * as React from 'react';

import { Grid } from '@material-ui/core';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

import { getAchieveRate, getResetDays } from '~/lib/challenge';
import {
  DEFINE_SCORE,
  DEFINE_DAYS,
  DEFINE_ACC_DAYS,
  DEFINE_PAST_DAYS,
  DEFINE_ACHIEVE_RATE,
  DEFINE_RESET_DAYS
} from '~/constants/challenge';

const ChallengeStatistics = (props: any) => {
  const { data } = props;

  const resetDays = getResetDays(data.histories);
  const achieveRate = getAchieveRate(resetDays, data.accDays);

  return (
    <React.Fragment>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justify="space-around"
        style={{ marginTop: 20, marginBottom: 20 }}
      >
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <NumberWidget
            title="スコア"
            number={data.score}
            unit=""
            description={DEFINE_SCORE}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <NumberWidget
            title="達成率"
            number={achieveRate}
            unit="%"
            description={DEFINE_ACHIEVE_RATE}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <NumberWidget
            title="大会累積日数"
            number={data.accDays || 0}
            unit="days"
            description={DEFINE_ACC_DAYS}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <NumberWidget
            title="リセット回数"
            number={resetDays}
            unit="days"
            description={DEFINE_RESET_DAYS}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <NumberWidget
            title="大会連続日数"
            number={data.days}
            unit="days"
            description={DEFINE_DAYS}
          />
        </Grid>
        <Grid item lg={4} md={4} sm={6} xs={6}>
          <NumberWidget
            title="過去連続日数"
            number={data.pastDays || data.days}
            unit="days"
            description={DEFINE_PAST_DAYS}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ChallengeStatistics;
