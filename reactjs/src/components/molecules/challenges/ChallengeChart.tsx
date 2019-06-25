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
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import theme from '../../../lib/theme';

const Wrapper = styled.div`
  margin-top: 50px;
`;

const LineChartWrapper = (props: any) => (
  <Wrapper>
    <MediaQuery minDeviceWidth={750}>
      <LineChart data={props.data} width={700} height={350}>
        {props.children}
      </LineChart>
    </MediaQuery>
    <MediaQuery maxDeviceWidth={749}>
      <LineChart data={props.data} width={350} height={200}>
        {props.children}
      </LineChart>
    </MediaQuery>
  </Wrapper>
);

const formatDate = (date: string): string => {
  return moment(date).format('MM/DD');
};

const ChallengeChart = (props: any) => {
  const histories: [] = props.histories.map((history: any) => ({
    date: formatDate(history.timestamp.toDate().toISOString()),
    ...history
  }));

  return (
    <LineChartWrapper data={histories}>
      <CartesianGrid />
      <XAxis dataKey="date" />
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
    </LineChartWrapper>
  );
};

export default ChallengeChart;
