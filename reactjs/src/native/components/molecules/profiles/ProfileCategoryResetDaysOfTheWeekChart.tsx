import React from 'react';

import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { brandWhite } from '~/lib/theme';

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
      fromZero
      chartConfig={config}
    />
  );
};

export default ProfileCategoryResetDaysOfTheWeekChart;
