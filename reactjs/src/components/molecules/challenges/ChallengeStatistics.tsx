import * as React from 'react';

import { Grid } from '@material-ui/core';
import moment from 'moment';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

const ChallengeStatistics = (props: any) => {
  const { data } = props;

  return (
    <Grid container spacing={3}>
      <Grid item lg={3} md={3} sm={6} xs={6}>
        <NumberWidget title="スコア" number={data.score} unit="" />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={6}>
        <NumberWidget title="連続日数" number={data.days} unit="days" />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={6}>
        <NumberWidget title="最長日数" number={data.maxDays} unit="days" />
      </Grid>
      <Grid item lg={3} md={3} sm={6} xs={6}>
        <NumberWidget
          title="経過日数"
          number={moment().diff(moment(data.openedAt), 'days')}
          unit="days"
        />
      </Grid>
    </Grid>
  );
};

export default ChallengeStatistics;
