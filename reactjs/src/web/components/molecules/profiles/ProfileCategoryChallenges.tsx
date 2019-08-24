import * as React from 'react';
import {
  Table,
  Paper,
  TableRow,
  TableCell,
  TableHead,
  TableBody
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { formatYearDate } from '~/lib/moment';
import { primaryColor, brandWhite } from '~/lib/theme';
import { getChallengeDashboardPath } from '~/lib/url';

const ChallengeCellHead = (props: any) => (
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

const ChallengeHead = (props: any) => (
  <TableHead>
    <TableRow>
      <ChallengeCellHead>タイトル</ChallengeCellHead>
      <ChallengeCellHead>参加日数</ChallengeCellHead>
      <ChallengeCellHead>リセット数</ChallengeCellHead>
      <ChallengeCellHead>割合</ChallengeCellHead>
      <ChallengeCellHead>終了日</ChallengeCellHead>
    </TableRow>
  </TableHead>
);

const ChallengeRow = withRouter((props: any) => {
  const { challenge, userShortId, history } = props;
  const { title, totalDuration, resetCount, percentage, closedAt } = challenge;

  const path = getChallengeDashboardPath(challenge.id, userShortId);

  return (
    <TableRow hover onClick={() => history.replace(path)}>
      <TableCell>{title}</TableCell>
      <TableCell>{totalDuration}日</TableCell>
      <TableCell>{resetCount}回</TableCell>
      <TableCell>{percentage}%</TableCell>
      <TableCell>{formatYearDate(closedAt)}</TableCell>
    </TableRow>
  );
});

const ProfileCategoryChallenges = (props: any) => {
  const { challenges, userShortId } = props;

  return (
    <React.Fragment>
      <Paper>
        <Table>
          <ChallengeHead />
          <TableBody>
            {challenges.map((challenge: any) => {
              return (
                <ChallengeRow
                  key={challenge.id}
                  challenge={challenge}
                  userShortId={userShortId}
                />
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </React.Fragment>
  );
};

export default ProfileCategoryChallenges;
