import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  Tooltip,
  YAxis,
  XAxis,
  CartesianGrid
} from 'recharts';
import theme from '~/lib/theme';

const ProfileCategoryResetChart = (props: any) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="99%" aspect={4}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          name="リセット数"
          stroke={theme.palette.primary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfileCategoryResetChart;
