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

const ProfileCategoryResetDaysOfTheWeekChart = (props: any) => {
  const { data } = props;

  const labels = data.map((d: any) => d.day);
  const counts = data.map((d: any) => d.count);

  const dataset = {
    labels,
    datasets: [
      {
        data: counts,
        color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`
      }
    ]
  };

  return (
    // @ts-ignore
    <BarChart
      data={dataset}
      width={screenWidth - 40}
      height={220}
      chartConfig={config}
    />
  );
};

export default ProfileCategoryResetDaysOfTheWeekChart;
