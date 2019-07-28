import * as React from 'react';
import moment from 'moment';

import { ContributionGraph } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const NOT_ACHIEVED_COLOR = '#ffcdd2';
const ACHIEVED_COLOR = '#ff5252';

const ChallengeGrass = (props: any) => {
  const { histories } = props;

  const openedAt = moment(props.openedAt.toDate());
  const closedAt = moment(props.closedAt.toDate());
  const duration = closedAt.diff(openedAt, 'days') + 1;

  const config = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: ACHIEVED_COLOR,
    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    }
  };

  const data = histories.map((history: any) => ({
    date: history.timestamp.toDate(),
    count: history.days
  }));

  return (
    <ContributionGraph
      values={data}
      endDate={closedAt.toDate()}
      numDays={duration}
      width={screenWidth - 20}
      height={220}
      chartConfig={config}
    />
  );
};

export default ChallengeGrass;
