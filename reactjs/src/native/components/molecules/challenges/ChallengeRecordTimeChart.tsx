import React from 'react';

import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { brandWhite } from '../../../../lib/theme';

const screenWidth = Math.round(Dimensions.get('window').width);

const config = {
  backgroundColor: brandWhite,
  backgroundGradientFrom: brandWhite,
  backgroundGradientTo: brandWhite,
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  },
  decimalPlaces: 0
};

const ChallengeRecordTimeChart = (props: any) => {
  const { data } = props;

  const labels = [] as string[];
  const minutes = [] as number[];
  let tmp = 0;

  data.map((record: any, i: number) => {
    tmp += record.minutes;
    if (i % 7 === 6) {
      labels.push(record.date);
      minutes.push(tmp);
      tmp = 0;
    }
  });

  const dataset = {
    labels,
    datasets: [
      {
        data: minutes,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
      }
    ]
  };

  return (
    // @ts-ignore
    <BarChart
      data={dataset}
      width={screenWidth - 50}
      height={220}
      fromZero
      chartConfig={config}
    />
  );
};

export default ChallengeRecordTimeChart;
