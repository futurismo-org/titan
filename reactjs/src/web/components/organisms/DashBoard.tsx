import * as React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'lib/firebase';
import DashBoardPaper from '../molecules/DashBoardPaper';
import DashBoardPaperPinned from '../molecules/DashBoardPaperPinned';
import Progress from '../atoms/CircularProgress';

import DiscordWidget from '../atoms/DiscordWidget';

const DashBoard = (props: any) => {
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .where('draft', '==', false)
      .orderBy('openedAt', 'desc')
      .limit(4)
  );

  const [value2, loading2, error2] = useCollection(
    firebase
      .firestore()
      .collection('categories')
      .orderBy('updatedAt', 'desc')
      .limit(4)
  );

  const [value3, loading3, error3] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .where('pinned', '==', true)
  );

  return (
    <React.Fragment>
      {(error || error2 || error3) && <strong>Error: {error}</strong>}
      {(loading || loading2 || loading3) && <Progress />}
      <DashBoardPaperPinned
        title="運営からのおすすめ"
        value={value3}
        type="pinned-challenge"
      />
      <DashBoardPaper title="人気のカテゴリ" value={value2} type="category" />
      <DashBoardPaper title="人気のチャレンジ" value={value} type="challenge" />
      <DiscordWidget />
    </React.Fragment>
  );
};

export default DashBoard;
