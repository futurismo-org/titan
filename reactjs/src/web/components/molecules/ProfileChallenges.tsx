import React from 'react';

import {
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Hidden
} from '@material-ui/core';

import moment, { formatYearDate } from '~/lib/moment';

const ProfileChallenges = (props: any) => {
  const { challenges } = props;

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
      <TableRow>
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
            .map((challenge: any) => {
              return <ChallengeRow key={challenge.id} challenge={challenge} />;
            })}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default ProfileChallenges;
