import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import Hidden from '@material-ui/core/Hidden';
import { Link } from 'react-router-dom';
import Progress from '../../atoms/CircularProgress';

import firebase from '../../../lib/firebase';

import UserAvatar from '../../atoms/UserAvatar';

import { getTwitterProfileURL } from '../../../lib/urlUtil';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const ChallengeLeaderBoard = (props: any) => {
  const { id } = props.match.params;
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
        <ConditionalTableCell>大会連続</ConditionalTableCell>
        <ConditionalTableCell>過去連続</ConditionalTableCell>
        <ConditionalTableCell>最新</ConditionalTableCell>
      </TableRow>
    </TableHead>
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value && (
        <Table>
          <LeaderBoardHead />
          <TableBody>
            {value.docs
              .sort(
                (x: any, y: any) =>
                  y.data().score - x.data().score ||
                  y.data().days - x.data().days ||
                  y.data().maxDays - x.data().maxDays
              )
              .map((doc, index) => (
                <TableRow key={doc.data().id}>
                  <TableCell component="th" scope="row">
                    {index + 1}位
                  </TableCell>
                  <ConditionalTableCell>
                    <UserAvatar
                      photoURL={doc.data().photoURL}
                      profileURL={getTwitterProfileURL(
                        doc.data().twitterUsername
                      )}
                    />
                  </ConditionalTableCell>
                  <TableCell>
                    <Link to={`/c/${id}/u/${doc.data().id}`}>
                      {doc.data().displayName || 'Annonymous'}
                    </Link>
                  </TableCell>
                  <TableCell>{doc.data().score}</TableCell>
                  <ConditionalTableCell>{doc.data().days}</ConditionalTableCell>
                  <ConditionalTableCell>
                    {doc.data().pastDays || doc.data().days}
                  </ConditionalTableCell>
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
