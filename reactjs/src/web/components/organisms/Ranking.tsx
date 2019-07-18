import * as React from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import moment from 'moment';
import Hidden from '@material-ui/core/Hidden';
import firebase from 'lib/firebase';
import { getTwitterProfileURL } from 'lib/urlUtil';
import Paper from '../templates/PaperWrapper';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';
import UserAvatar from '../atoms/UserAvatar';

const ConditionalTableCell = (props: any) => (
  <Hidden only="xs">
    <TableCell>{props.children}</TableCell>
  </Hidden>
);

const Ranking = (props: any) => {
  const [value, loading, error] = useCollection(
    firebase.firestore().collection('users')
  );

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
      <p>ランキング機能は準備中です...</p>
      <p>データが不十分なため、 アクティブユーザを順に表示しています。</p>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value && (
        <Table>
          <LeaderBoardHead />
          <TableBody>
            {value.docs
              .sort((x: any, y: any) =>
                moment(y.data().updatedAt.toDate()).diff(
                  moment(x.data().updatedAt.toDate())
                )
              )
              .map((doc, index) => (
                <TableRow key={doc.data().id}>
                  <TableCell component="th" scope="row">
                    {index + 1}位
                  </TableCell>
                  <TableCell>
                    <UserAvatar
                      photoURL={doc.data().photoURL}
                      profileURL={getTwitterProfileURL(
                        doc.data().twitterUsername
                      )}
                    />
                  </TableCell>
                  <TableCell>
                    <NoStyledExternalLink
                      href={getTwitterProfileURL(doc.data().twitterUsername)}
                    >
                      {doc.data().displayName || 'Annonymous'}
                    </NoStyledExternalLink>
                  </TableCell>
                  <ConditionalTableCell>
                    {moment(doc.data().updatedAt.toDate()).fromNow()}
                  </ConditionalTableCell>
                  <ConditionalTableCell>
                    {moment(doc.data().createdAt.toDate()).fromNow()}
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
