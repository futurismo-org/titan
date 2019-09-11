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
import { CATEGORY_KIND_BAD, CATEGORY_KIND_GOOD } from '~/lib/category';

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

const ChallengeHead = (props: any) => {
  const { kind } = props;
  return (
    <TableHead>
      <TableRow>
        <ChallengeCellHead>タイトル</ChallengeCellHead>
        <ChallengeCellHead>参加日数</ChallengeCellHead>
        {kind === CATEGORY_KIND_GOOD && (
          <ChallengeCellHead>ログ数</ChallengeCellHead>
        )}
        {kind === CATEGORY_KIND_BAD && (
          <ChallengeCellHead>リセット数</ChallengeCellHead>
        )}
        {kind === CATEGORY_KIND_BAD && (
          <ChallengeCellHead>割合</ChallengeCellHead>
        )}
        <ChallengeCellHead>終了日</ChallengeCellHead>
      </TableRow>
    </TableHead>
  );
};

const ChallengeRow = withRouter((props: any) => {
  const { challenge, userShortId, history, kind } = props;
  const {
    title,
    totalDuration,
    resetCount,
    percentage,
    closedAt,
    totalCount
  } = challenge;

  const path = getChallengeDashboardPath(challenge.id, userShortId);

  return (
    <TableRow hover onClick={() => history.push(path)}>
      <TableCell>{title}</TableCell>
      <TableCell>{totalDuration}日</TableCell>
      {kind === CATEGORY_KIND_GOOD && <TableCell>{totalCount}回</TableCell>}
      {kind === CATEGORY_KIND_BAD && <TableCell>{resetCount}回</TableCell>}
      {kind === CATEGORY_KIND_BAD && <TableCell>{percentage}%</TableCell>}
      <TableCell>{formatYearDate(closedAt)}</TableCell>
    </TableRow>
  );
});

const ProfileCategoryChallenges = (props: any) => {
  const { challenges, userShortId, categoryKind } = props;

  return (
    <React.Fragment>
      <Paper>
        <Table>
          <ChallengeHead kind={categoryKind} />
          <TableBody>
            {challenges.map((challenge: any) => {
              return (
                <ChallengeRow
                  key={challenge.id}
                  challenge={challenge}
                  userShortId={userShortId}
                  kind={categoryKind}
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
