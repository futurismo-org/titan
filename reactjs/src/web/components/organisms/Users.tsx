import React, { useState, useEffect } from 'react';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  Paper as MaterialPaper,
  Radio,
  FormControl,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';

import Hidden from '@material-ui/core/Hidden';
import styled from 'styled-components';
import moment, { fromNow } from '~/lib/moment';
import Paper from '../templates/PaperWrapper';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import UserAvatar from '../atoms/UserAvatar';

import { primaryColor, brandWhite, leaderboardMyColor } from '~/lib/theme';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const RADIO_SCORE = 'スコア';
const RADIO_LATEST = '最新';

const Users = (props: any) => {
  const { users, myId, isLoaded } = props;
  const [sortkey, setSortKey] = useState(RADIO_SCORE);

  useEffect(() => {
    console.log('users mounted');

    return () => {
      console.log('users unmounted');
    };
  }, []);

  const onSortKeyChange = (e: any) => {
    e.preventDefault();
    setSortKey(e.target.value);
  };

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
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell />
        <StyledTableCell>名前</StyledTableCell>
        <StyledTableCell>スコア</StyledTableCell>
        <StyledConditionalTableCell>最新</StyledConditionalTableCell>
        <StyledConditionalTableCell>登録</StyledConditionalTableCell>
      </TableRow>
    </TableHead>
  );

  const compare = (x: any, y: any) => {
    if (sortkey === RADIO_LATEST) {
      return moment(y.updatedAt.toDate()).diff(moment(x.updatedAt.toDate()));
    } else if (sortkey === RADIO_SCORE) {
      return y.toralScore === x.totalScore
        ? 0
        : y.totalScore > x.totalScore
        ? 1
        : -1;
    }
  };

  return (
    <Paper>
      <Title text="ユーザーランキング" />
      {!isLoaded && <Progress />}
      {isLoaded && !!users && (
        <React.Fragment>
          <FormControl
            component="fieldset"
            style={{ marginTop: 10, marginBottom: 10 }}
          >
            <RadioGroup
              aria-label="sortkey"
              name="sortkey"
              value={sortkey}
              onChange={onSortKeyChange}
            >
              <div style={{ display: 'flex' }}>
                <FormControlLabel
                  value={RADIO_SCORE}
                  control={<Radio color="primary" />}
                  label={RADIO_SCORE}
                />
                <FormControlLabel
                  value={RADIO_LATEST}
                  control={<Radio color="primary" />}
                  label={RADIO_LATEST}
                />
              </div>
            </RadioGroup>
          </FormControl>
          <MaterialPaper>
            <Table>
              <LeaderBoardHead />
              <TableBody>
                {users.sort(compare).map((user: any, index: number) => {
                  const StyledTableRow = styled(TableRow)`
                    && {
                      background-color: ${user.shortId === myId
                        ? leaderboardMyColor
                        : brandWhite};
                    }
                  `;

                  return (
                    <StyledTableRow key={user.id} hover>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <UserAvatar
                          photoURL={user.photoURL}
                          userId={user.shortId}
                        />
                      </TableCell>
                      <TableCell>{user.displayName || 'Annonymous'}</TableCell>
                      <TableCell>{user.totalScore || 0}</TableCell>
                      <ConditionalTableCell>
                        {fromNow(user.updatedAt.toDate())}
                      </ConditionalTableCell>
                      <ConditionalTableCell>
                        {fromNow(user.createdAt.toDate())}
                      </ConditionalTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </MaterialPaper>
        </React.Fragment>
      )}
    </Paper>
  );
};

export default Users;
