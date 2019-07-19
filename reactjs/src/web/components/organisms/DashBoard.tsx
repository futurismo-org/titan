import * as React from 'react';
import DashBoardPaper from '../molecules/DashBoardPaper';
// import DashBoardPaperPinned from '../molecules/DashBoardPaperPinned';
import Progress from '../atoms/CircularProgress';

import DiscordWidget from '../atoms/DiscordWidget';

const DashBoard = (props: any) => {
  const { challenges, loading, error, fetchChallenges } = props;

  React.useEffect(() => {
    fetchChallenges();
  }, [fetchChallenges]);

  // const [value2, loading2, error2] = useCollection(
  //   firebase
  ///     .firestore()
  //     .collection('categories')
  //     .orderBy('updatedAt', 'desc')
  //     .limit(4)
  // );

  // const [value3, loading3, error3] = useCollection(
  //   firebase
  //     .firestore()
  //     .collection('challenges')
  //     .where('pinned', '==', true)
  // );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {/* <DashBoardPaperPinned
        title="運営からのおすすめ"
        value={value3}
        type="pinned-challenge"
      />
      <DashBoardPaper title="人気のカテゴリ" value={value2} type="category" /> */}
      {challenges && (
        <React.Fragment>
          <DashBoardPaper
            title="人気のチャレンジ"
            items={challenges}
            type="challenge"
          />
          <DiscordWidget />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
