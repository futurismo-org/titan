import * as React from 'react';
import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Hidden,
  Chip,
  Paper
  // Typography,
  // Button
} from '@material-ui/core';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

import { formatDatetime } from '~/lib/moment';
import { wrapShowN, wrapShowS } from '~/lib/general';
import { RESET, RECORD } from '~/lib/challenge';
import { brandWhite, primaryColor } from '~/lib/theme';
import { isMobile } from '~/web/lib/web';

const cellstyle = {
  backgroundColor: primaryColor,
  color: brandWhite,
  fontWeight: 'bold'
};

const ConditionalTableCell = (props: any) => {
  const style = props.head ? cellstyle : {};

  return (
    <Hidden only="xs">
      <TableCell style={style}>{props.children}</TableCell>
    </Hidden>
  );
};

const getType = (type: string) => {
  if (type === RESET) {
    return <Chip color="primary" label={RESET} />;
  }
  return <Chip color="secondary" label={RECORD} />;
};

const HistoryCellHead = (props: any) => (
  <TableCell style={cellstyle as any}>{props.children}</TableCell>
);

const HistoryHead = (props: any) => (
  <TableHead>
    <TableRow>
      <HistoryCellHead>日時</HistoryCellHead>
      <HistoryCellHead>タイプ</HistoryCellHead>
      <HistoryCellHead>点数</HistoryCellHead>
      <ConditionalTableCell head>連続</ConditionalTableCell>
      <ConditionalTableCell head>累積</ConditionalTableCell>
      <ConditionalTableCell head>過去</ConditionalTableCell>
      <ConditionalTableCell head>経過</ConditionalTableCell>
      {/* <ConditionalTableCell>操作</ConditionalTableCell> */}
    </TableRow>
  </TableHead>
);

const HistoryRow = (props: any) => {
  const { history } = props;
  const { timestamp, score, type, days, diff, accDays, pastDays } = history;

  // const [open, setOpen] = React.useState(false);

  // const handleClickOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  // const deleteHandler = (handler: any) => {
  //   handler().then(() => {
  //     handleClose();
  //     window.location.reload(); // eslint-disable-line
  //   });
  // };

  return (
    <TableRow hover>
      <TableCell>{wrapShowS(formatDatetime(timestamp.toDate()))}</TableCell>
      <TableCell>{getType(type)}</TableCell>
      <TableCell>{wrapShowN(score)}</TableCell>
      <ConditionalTableCell>{wrapShowN(days)}</ConditionalTableCell>
      <ConditionalTableCell>{wrapShowN(accDays)}</ConditionalTableCell>
      <ConditionalTableCell>{wrapShowN(pastDays)}</ConditionalTableCell>
      <ConditionalTableCell>{wrapShowN(diff)}</ConditionalTableCell>
      {/* <ConditionalTableCell>
        <Typography
          onClick={() => handleClickOpen()}
          component="span"
          variant="caption"
          style={{ textDecoration: 'underline' }}
        >
          削除
        </Typography>
      </ConditionalTableCell> */}
      {/* <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">記録の削除</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            記録({type} {formatDatetime(timestamp.toDate())})
            を削除します。よろしいですか？
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            いいえ
          </Button>
          <Button
            onClick={() => deleteHandler(handler)}
            color="primary"
            autoFocus
          >
            削除
          </Button>
        </DialogActions>
      </Dialog> */}
    </TableRow>
  );
};

const ChallengeHistories = (props: any) => {
  const { histories, handler } = props;

  const size = isMobile ? 'small' : 'medium';

  return (
    <Paper>
      <Table size={size} style={{ marginTop: 20 }}>
        <HistoryHead />
        <TableBody>
          {histories
            .sort((x: any, y: any) => y.timestamp.seconds - x.timestamp.seconds)
            .map((history: any) => {
              return (
                <HistoryRow
                  key={history.id}
                  history={history}
                  handler={handler(history)}
                />
              );
            })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ChallengeHistories;
