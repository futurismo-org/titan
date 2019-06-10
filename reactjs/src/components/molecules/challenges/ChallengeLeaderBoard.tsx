import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '../../atoms/Avatar';

import firebase from '../../../lib/firebase';

const NoStyledLink = styled.a`
  text-decoration: none;
  color: 'inherit';
`;

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const ChallengeLeaderBoard = (props: any) => {
  const id: string = props.match.params.id;
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .doc(id)
      .collection('participants')
  );

  const LeaderBoardHead = () => (
    <TableHead>
      <TableRow>
        <TableCell>順位</TableCell>
        <ConditionalTableCell />
        <TableCell>名前</TableCell>
        <TableCell>スコア</TableCell>
        <ConditionalTableCell>連続日数</ConditionalTableCell>
        <ConditionalTableCell>最新</ConditionalTableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <Table>
          <LeaderBoardHead />
          <TableBody>
            {value.docs
              .sort(
                (x: any, y: any) =>
                  y.data().score - x.data().score ||
                  y.data().days - x.data().days
              )
              .map((doc, index) => (
                <TableRow key={doc.data().id}>
                  <TableCell component="th" scope="row">
                    {index + 1}位
                  </TableCell>
                  <ConditionalTableCell>
                    <Avatar src={doc.data().photoURL} />
                  </ConditionalTableCell>
                  <TableCell>
                    <NoStyledLink
                      href={doc.data().twitterURL || 'https://twitter.com'}
                    >
                      {doc.data().displayName}
                    </NoStyledLink>
                  </TableCell>
                  <TableCell>{doc.data().score}</TableCell>
                  <ConditionalTableCell>{doc.data().days}</ConditionalTableCell>
                  <ConditionalTableCell>
                    {moment(doc.data().updatedAt.toDate()).fromNow()}
                  </ConditionalTableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
