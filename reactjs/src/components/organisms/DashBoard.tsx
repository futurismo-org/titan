import * as React from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import DashBoardPaper from '../molecules/DashBoardPaper';
import firebase from '../../lib/firebase';
import Progress from '../atoms/CircularProgress';

import DiscordWidget from '../atoms/DiscordWidget';

const DashBoard = (props: any) => {
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .limit(4)
  );

  const [value2, loading2, error2] = useCollection(
    firebase
      .firestore()
      .collection('categories')
      .limit(4)
  );

  return (
    <React.Fragment>
      {(error || error2) && <strong>Error: {error}</strong>}
      {(loading || loading2) && <Progress />}
      <DashBoardPaper title="チャレンジ一覧" value={value} type="challenge" />
      <DashBoardPaper title="人気のカテゴリ" value={value2} type="category" />
      <DiscordWidget />
    </React.Fragment>
  );
};

export default DashBoard;
