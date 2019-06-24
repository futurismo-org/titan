import * as React from 'react';
import moment from 'moment';
import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  Hidden,
  Chip
} from '@material-ui/core';

const formatDate = (date: string): string => {
  return moment(date).format('MM/DD HH:mm');
};

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const getType = (type: string) => {
  if (type === 'RESET') {
    return <Chip color="primary" label="リセット" />;
  } else {
    return <Chip color="secondary" label="記録" />;
  }
};

const HistoryHead = (props: any) => (
  <TableHead>
    <TableCell>日時</TableCell>
    <TableCell>スコア</TableCell>
    <ConditionalTableCell>連続</ConditionalTableCell>
    <ConditionalTableCell>経過</ConditionalTableCell>
    <TableCell>タイプ</TableCell>
  </TableHead>
);

const HistoryRow = ({ history, ...props }: any) => {
  const { timestamp, score, type, days, diff } = history;

  return (
    <TableRow>
      <TableCell>{formatDate(timestamp.toDate().toISOString())}</TableCell>
      <TableCell>{score}</TableCell>
      <ConditionalTableCell>{days}</ConditionalTableCell>
      <ConditionalTableCell>{diff}</ConditionalTableCell>
      <TableCell>{getType(type)}</TableCell>
    </TableRow>
  );
};

const ChallengeHistories = (props: any) => {
  const { histories } = props;

  return (
    <React.Fragment>
      <Paper>
        <Table size="small">
          <HistoryHead />
          {histories
            .sort((x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds)
            .map((history: any) => {
              return <HistoryRow key={history.id} history={history} />;
            })}
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default ChallengeHistories;
