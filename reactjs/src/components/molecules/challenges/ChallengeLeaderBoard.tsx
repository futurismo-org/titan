import * as React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import { useCollection } from 'react-firebase-hooks/firestore';
import moment from 'moment';
import Avatar from '../../atoms/Avatar';

import firebase from '../../../lib/firebase';

const ChallengeLeaderBoard = (props: any) => {
  const id: string = props.match.params.id;
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .doc(id)
      .collection('participants')
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>順位</TableCell>
              <TableCell />
              <TableCell>名前</TableCell>
              <TableCell>スコア</TableCell>
              <TableCell>連続日数</TableCell>
              <TableCell>最新</TableCell>
            </TableRow>
          </TableHead>
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
                  <TableCell>
                    <Avatar src={doc.data().photoURL} />
                  </TableCell>
                  <TableCell>{doc.data().displayName}</TableCell>
                  <TableCell>{doc.data().score}</TableCell>
                  <TableCell>{doc.data().days}</TableCell>
                  <TableCell>
                    {moment(doc.data().updatedAt.toDate()).fromNow()}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
