import * as React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import moment from 'moment';
import theme from '../../../lib/theme';

const ChallengeChart = (props: any) => {
  const histories: [] = props.histories;

  return (
    <LineChart width={350} height={300} data={histories}>
      <CartesianGrid />
      <XAxis
        dataKey="timestamp"
        tickFormatter={props => moment(props.timestamp).format('MM/DD')}
      />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="score"
        stroke={theme.palette.primary.main}
      />
      <Line
        type="monotone"
        dataKey="days"
        stroke={theme.palette.secondary.main}
      />
    </LineChart>
  );
};

export default ChallengeChart;
