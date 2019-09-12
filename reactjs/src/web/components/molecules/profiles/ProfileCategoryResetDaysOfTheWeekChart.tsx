import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar
} from 'recharts';
import { primaryColor } from '~/lib/theme';

const ProfileCategoryResetTimezoneChart = (props: any) => {
  const { data } = props;
  return (
    <ResponsiveContainer width="99%" aspect={4}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill={primaryColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfileCategoryResetTimezoneChart;
