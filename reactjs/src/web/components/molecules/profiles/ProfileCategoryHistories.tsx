import * as React from 'react';
import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from '@material-ui/core';
import { formatDatetime } from '~/lib/moment';
import { primaryColor, brandWhite } from '~/lib/theme';

const HistoryCellHead = (props: any) => (
  <TableCell
    style={{
      backgroundColor: primaryColor,
      color: brandWhite,
      fontWeight: 'bold'
    }}
  >
    {props.children}
  </TableCell>
);

const HistoryHead = (props: any) => (
  <TableHead>
    <TableRow>
      <HistoryCellHead>試み</HistoryCellHead>
      <HistoryCellHead>継続時間</HistoryCellHead>
      <HistoryCellHead>開始日時</HistoryCellHead>
      <HistoryCellHead>終了日時</HistoryCellHead>
    </TableRow>
  </TableHead>
);

const HistoryRow = (props: any) => {
  const { history } = props;
  const { startDate, endDate, duration, attempt } = history;

  return (
    <TableRow hover>
      <TableCell>{attempt}回目</TableCell>
      <TableCell>{duration}</TableCell>
      <TableCell>{formatDatetime(startDate)}</TableCell>
      <TableCell>{formatDatetime(endDate)}</TableCell>
    </TableRow>
  );
};

const ProfileCategoryHistories = (props: any) => {
  const { histories } = props;

  return (
    <React.Fragment>
      <Paper>
        <Table>
          <HistoryHead />
          <TableBody>
            {histories.map((history: any) => {
              return <HistoryRow key={history.id} history={history} />;
            })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default ProfileCategoryHistories;
