import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Paper } from '@material-ui/core';
import Progress from '../../atoms/CircularProgress';

import UserAvatar from '../../atoms/UserAvatar';

import { leaderboardMyColor, brandWhite, primaryColor } from '~/lib/theme';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const ChallengeLeaderBoard = (props: any) => {
  const { users, loading, error, resourceId, fetchUsers, myId } = props;

  useEffect(() => {
    fetchUsers(resourceId);
  }, [fetchUsers, resourceId]);

  const StyledTableCell = (props: any) => (
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

  const StyledConditionalTableCell = (props: any) => (
    <Hidden only="xs">
      <StyledTableCell>{props.children}</StyledTableCell>
    </Hidden>
  );

  const LeaderBoardHead = () => (
    <TableHead>
      <TableRow>
        <StyledTableCell>順位</StyledTableCell>
        <StyledTableCell />
        <StyledTableCell>ユーザ</StyledTableCell>
        <StyledTableCell>スコア</StyledTableCell>
        <StyledConditionalTableCell>大会連続</StyledConditionalTableCell>
        <StyledConditionalTableCell>最長</StyledConditionalTableCell>
        <StyledConditionalTableCell>過去連続</StyledConditionalTableCell>
        <StyledConditionalTableCell>投稿数</StyledConditionalTableCell>
        <StyledConditionalTableCell>最新</StyledConditionalTableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {users && (
        <Paper style={{ marginTop: 20 }}>
          <Table size="small">
            <LeaderBoardHead />
            <TableBody>
              {users.map((user: any) => {
                const StyledTableRow = styled(TableRow)`
                  && {
                    background-color: ${user.id === myId
                      ? leaderboardMyColor
                      : brandWhite};
                  }
                `;

                return (
                  <StyledTableRow key={user.id} hover>
                    <TableCell component="th" scope="row">
                      {user.rank}位
                    </TableCell>
                    <TableCell>
                      <UserAvatar photoURL={user.photoURL} userId={user.id} />
                    </TableCell>
                    <TableCell>
                      <Link style={{ color: 'inherit' }} to={user.profilePath}>
                        {user.displayName}
                      </Link>
                    </TableCell>
                    <TableCell>{user.score}</TableCell>
                    <ConditionalTableCell>{user.days}</ConditionalTableCell>
                    <ConditionalTableCell>{user.maxDays}</ConditionalTableCell>
                    <ConditionalTableCell>
                      {user.pastDays || user.days}
                    </ConditionalTableCell>
                    <ConditionalTableCell>
                      {user.histories ? user.histories.length : 0}
                    </ConditionalTableCell>
                    <ConditionalTableCell>{user.latest}</ConditionalTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
