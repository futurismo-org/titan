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

const ProfileCategoryRecordChart = (props: any) => {
  const { data, unit } = props;

  const labels = data.map((record: any) => record.duration);
  const dataSet = data.map((d: any) => {
    if (unit === 'minutes') {
      return d.minutes;
    } else {
      return d.count;
    }
  });

  const dataset = {
    labels,
    datasets: [
      {
        data: dataSet,
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

export default ProfileCategoryRecordChart;
