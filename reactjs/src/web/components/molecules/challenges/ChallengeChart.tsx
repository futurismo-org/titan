import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import theme from '~/lib/theme';
import { formatDateShort } from '~/lib/moment';

const ChallengeChart = (props: any) => {
  const histories: [] = props.histories
    .sort((x: any, y: any) => x.timestamp.seconds - y.timestamp.seconds)
    .map((history: any) => ({
      date: formatDateShort(history.timestamp.toDate().toISOString()),
      ...history
    }));

  return (
    <ResponsiveContainer width="99%" minHeight={250}>
      <LineChart data={histories}>
        <CartesianGrid />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="score"
          name="スコア"
          stroke={theme.palette.primary.main}
        />
        <Line
          type="monotone"
          dataKey="days"
          name="大会連続日数"
          stroke={theme.palette.secondary.main}
        />
        <Line
          type="monotone"
          dataKey="accDays"
          name="大会累積日数"
          stroke={theme.palette.secondary.main}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChallengeChart;
