import React from 'react';

import { LineChart } from 'react-native-chart-kit';
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

const ProfileCategoryResetChart = (props: any) => {
  const { data } = props;

  const labels = data.map((record: any) => record.date);
  const counts = data.map((record: any) => record.count);

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
    <LineChart
      data={dataset}
      width={screenWidth - 20}
      height={220}
      withShadow={false}
      withVerticalLabels={false}
      chartConfig={config}
    />
  );
};

export default ProfileCategoryResetChart;
