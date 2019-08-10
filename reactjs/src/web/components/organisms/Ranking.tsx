import * as React from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Hidden from '@material-ui/core/Hidden';
import { fromNow } from '~/lib/moment';
import Paper from '../templates/PaperWrapper';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import UserAvatar from '../atoms/UserAvatar';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const Ranking = (props: any) => {
  const { users, error, loading, fetchUsers } = props;

  React.useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const LeaderBoardHead = () => (
    <TableHead>
      <TableRow>
        <TableCell>順位</TableCell>
        <TableCell />
        <TableCell>名前</TableCell>
        <ConditionalTableCell>最新</ConditionalTableCell>
        <ConditionalTableCell>登録</ConditionalTableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <Paper>
      <Title text="ユーザランキング" />
      <p>ランキング機能は準備中です。</p>
      <p>データが不十分なため、 アクティブユーザを順に表示しています。</p>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {users && (
        <Table>
          <LeaderBoardHead />
          <TableBody>
            {users.map((user: any, index: number) => (
              <TableRow key={user.id}>
                <TableCell component="th" scope="row">
                  {index + 1}位
                </TableCell>
                <TableCell>
                  <UserAvatar photoURL={user.photoURL} userId={user.shortId} />
                </TableCell>
                <TableCell>{user.displayName || 'Annonymous'}</TableCell>
                <ConditionalTableCell>
                  {fromNow(user.updatedAt.toDate())}
                </ConditionalTableCell>
                <ConditionalTableCell>
                  {fromNow(user.createdAt.toDate())}
                </ConditionalTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default Ranking;
