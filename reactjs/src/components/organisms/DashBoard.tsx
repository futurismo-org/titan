import * as React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DashBoardPaper from '../molecules/DashBoardPaper';
import DashBoardPaperPinned from '../molecules/DashBoardPaperPinned';
import firebase from '../../lib/firebase';
import Progress from '../atoms/CircularProgress';

import DiscordWidget from '../atoms/DiscordWidget';

const DashBoard = (props: any) => {
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .where('draft', '==', false)
      .orderBy('updatedAt', 'desc')
      .limit(4)
  );

  const [value2, loading2, error2] = useCollection(
    firebase
      .firestore()
      .collection('categories')
      .orderBy('updatedAt', 'desc')
      .limit(4)
  );

  return (
    <React.Fragment>
      {(error || error2) && <strong>Error: {error}</strong>}
      {(loading || loading2) && <Progress />}
      <DashBoardPaperPinned
        title="運営からのおすすめ"
        value={value}
        type="pinned-challenge"
      />
      <DashBoardPaper title="人気のカテゴリ" value={value2} type="category" />
      <DashBoardPaper title="人気のチャレンジ" value={value} type="challenge" />
      <DiscordWidget />
    </React.Fragment>
  );
};

export default DashBoard;
