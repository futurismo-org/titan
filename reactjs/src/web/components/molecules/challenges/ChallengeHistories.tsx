import * as React from 'react';
import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Hidden,
  Chip,
  Typography,
  Button
} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
  const { history, handler } = props;
  const { timestamp, score, type, days, diff, accDays, pastDays } = history;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const deleteHandler = (handler: any) => {
    handler();
    handleClose();
  };

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
        <Typography
          onClick={() => handleClickOpen()}
          component="span"
          variant="caption"
          style={{ textDecoration: 'underline' }}
        >
          削除
        </Typography>
      </ConditionalTableCell>
      <Dialog
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
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </TableRow>
  );
};

const ChallengeHistories = (props: any) => {
  const { histories, handler } = props;

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
    </React.Fragment>
  );
};

export default ChallengeHistories;
