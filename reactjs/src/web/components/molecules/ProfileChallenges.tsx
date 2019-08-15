import React from 'react';

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Hidden
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import moment, { formatYearDate } from '~/lib/moment';

const ProfileChallenges = (props: any) => {
  const { challenges, userShortId, history } = props;

  const ConditionalTableCell = (props: any) => (
    <Hidden only="xs">
      <TableCell>{props.children}</TableCell>
    </Hidden>
  );

  const ChallengeHead = (props: any) => (
    <TableHead>
      <TableRow>
        <TableCell>タイトル</TableCell>
        <TableCell>順位</TableCell>
        <ConditionalTableCell>スコア</ConditionalTableCell>
        <ConditionalTableCell>上位</ConditionalTableCell>
        <TableCell>終了日</TableCell>
      </TableRow>
    </TableHead>
  );

  const ChallengeRow = (props: any) => {
    const { challenge } = props;

    return (
      <TableRow
        hover
        onClick={() =>
          history.push(`/c/${challenge.id}/u/${userShortId}/dashbaord`)
        }
      >
        <TableCell>{challenge.title}</TableCell>
        <TableCell>{challenge.rank}位</TableCell>
        <ConditionalTableCell>{challenge.score}</ConditionalTableCell>
        <ConditionalTableCell>{challenge.ratio}%</ConditionalTableCell>
        <TableCell>{formatYearDate(challenge.closedAt.toDate())}</TableCell>
      </TableRow>
    );
  };

  return (
    <React.Fragment>
      <Table>
        <ChallengeHead />
        <TableBody>
          {challenges
            .sort((x: any, y: any) =>
              moment(y.closedAt.toDate()).diff(moment(x.closedAt.toDate()))
            )
            .filter((challenge: any) => challenge.score)
            .map((challenge: any) => {
              return <ChallengeRow key={challenge.id} challenge={challenge} />;
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default withRouter(ProfileChallenges);
