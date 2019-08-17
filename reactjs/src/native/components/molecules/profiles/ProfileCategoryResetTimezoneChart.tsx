import React from 'react';

import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const screenWidth = Math.round(Dimensions.get('window').width);

const config = {
  backgroundColor: '#fff',
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16
  }
};

const ProfileCategoryResetTimezoneChart = (props: any) => {
  const { data } = props;

  const labels = data
    .map((record: any) => record.hour)
    .filter((label: any) => label % 2 === 1);

  let tmpCount = 0;
  let accCounts: any[] = [];

  data.forEach((d: any) => {
    if (d.hour % 2 === 0) {
      tmpCount = d.count;
    } else {
      accCounts.push(tmpCount + d.count);
    }
  });

  const dataset = {
    labels,
    datasets: [
      {
        data: accCounts,
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
      chartConfig={config}
    />
  );
};

export default ProfileCategoryResetTimezoneChart;
