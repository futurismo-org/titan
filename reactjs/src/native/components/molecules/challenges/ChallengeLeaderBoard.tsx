import * as React from 'react';

import { useCollection } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-native';
import firebase from '~/lib/firebase';
// import { getTwitterProfileURL } from '~/lib/url';
import Progress from '../../atoms/CircularProgress';

import { fromNow } from '~/lib/moment';

const { Table, Row } = require('react-native-table-component');

const ChallengeLeaderBoard = (props: any) => {
  const { challengeId } = props;

  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .doc(challengeId)
      .collection('participants')
  );

  const tableHead = ['順位', '', '名前', 'スコア', '最新'];

  const LeaderBoardHead = () => (
    <Row borderStyle={{ borderColor: '#ffffff' }} data={tableHead} />
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value && (
        <Table>
          <LeaderBoardHead />
          {value.docs
            .sort(
              (x: any, y: any) =>
                y.data().score - x.data().score ||
                y.data().days - x.data().days ||
                y.data().maxDays - x.data().maxDays ||
                y.data().updatedAt.toDate() - x.data().updatedAt.toDate()
            )
            .map((user: any, index: number) => {
              const uri = user.photoURL
                ? user.photoURL
                : 'https://titan-fire.com/anonymous.png';

              const userPath = `/c/${challengeId}/u/${user.id}`;

              const rowData = [
                `${index + 1}位`,
                '',
                <Link to={userPath} key={user.id}>
                  {user.displayName || 'Annonymous'}
                </Link>,
                user.score,
                fromNow(user.updatedAt.toDate())
              ];
              return <Row data={rowData} key={user.id} />;
            })}
        </Table>
      )}
    </React.Fragment>
  );
};

export default ChallengeLeaderBoard;
