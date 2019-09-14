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

const ChallengeRecordTimeChart = (props: any) => {
  const { data } = props;

  return (
    <ResponsiveContainer width="99%" aspect={4}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="minutes" fill={primaryColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ChallengeRecordTimeChart;
