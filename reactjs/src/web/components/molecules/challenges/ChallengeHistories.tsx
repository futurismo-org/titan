import * as React from 'react';
import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Hidden,
  Chip
} from '@material-ui/core';

import { formatDatetime } from '~/lib/moment';
import { wrapShowN, wrapShowS } from '~/lib/general';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const getType = (type: string) => {
  if (type === 'RESET') {
    return <Chip color="primary" label="RESET" />;
  }
  return <Chip color="secondary" label="RECORD" />;
};

const HistoryHead = (props: any) => (
  <TableHead>
    <TableRow>
      <TableCell>日時</TableCell>
      <TableCell>タイプ</TableCell>

      <TableCell>点数</TableCell>
      <ConditionalTableCell>連続</ConditionalTableCell>
      <ConditionalTableCell>累積</ConditionalTableCell>
      <ConditionalTableCell>過去</ConditionalTableCell>
      <ConditionalTableCell>経過</ConditionalTableCell>
      <ConditionalTableCell>操作</ConditionalTableCell>
    </TableRow>
  </TableHead>
);

const HistoryRow = (props: any) => {
  const {
    timestamp,
    score,
    type,
    days,
    diff,
    accDays,
    pastDays
  } = props.history;

  return (
    <TableRow>
      <TableCell>{wrapShowS(formatDatetime(timestamp.toDate()))}</TableCell>
      <TableCell>{getType(type)}</TableCell>
      <TableCell>{wrapShowN(score)}</TableCell>
      <ConditionalTableCell>{wrapShowN(days)}</ConditionalTableCell>
      <ConditionalTableCell>{wrapShowN(accDays)}</ConditionalTableCell>
      <ConditionalTableCell>{wrapShowN(pastDays)}</ConditionalTableCell>
      <ConditionalTableCell>{wrapShowN(diff)}</ConditionalTableCell>
      <ConditionalTableCell>
        <span style={{ textDecoration: 'underline' }}>削除</span>
      </ConditionalTableCell>
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
          <TableBody>
            {histories
              .sort(
                (x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds
              )
              .map((history: any) => {
                return <HistoryRow key={history.id} history={history} />;
              })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default ChallengeHistories;
