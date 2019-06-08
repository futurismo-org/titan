import * as React from 'react';
import { Text } from 'react-native';
// import { useCollection } from 'react-firebase-hooks/firestore';
// import DashBoardPaper from '../molecules/DashBoardPaper';
// import firebase from '../../lib/firebase';

const DashBoard = (props: any) => {
  return <Text>This is DashBoard</Text>;
  // const [value, loading, error] = useCollection(
  //   firebase
  //     .firestore()
  //     .collection('challenges')
  //     .limit(4)
  // );
  // const [value2, loading2, error2] = useCollection(
  //   firebase
  //     .firestore()
  //     .collection('categories')
  //     .limit(4)
  // );
  // return (
  //   <React.Fragment>
  //     {(error || error2) && <strong>Error: {error}</strong>}
  //     {(loading || loading2) && <span>Collection: Loading...</span>}
  //     <DashBoardPaper
  //       title="開催中のチャレンジ"
  //       value={value}
  //       type="challenge"
  //     />
  //     <DashBoardPaper title="人気のカテゴリ" value={value2} type="category" />
  //   </React.Fragment>
  // );
};

export default DashBoard;
