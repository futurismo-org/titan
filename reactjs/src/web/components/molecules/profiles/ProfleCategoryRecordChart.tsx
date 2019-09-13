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

const ProfileCategoryRecordChart = (props: any) => {
  const { data, unit } = props;

  return (
    <ResponsiveContainer width="99%" aspect={4}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="duration" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey={unit} fill={primaryColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProfileCategoryRecordChart;
