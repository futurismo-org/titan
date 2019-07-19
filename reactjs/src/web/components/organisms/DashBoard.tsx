import * as React from 'react';
import DashBoardPaper from '../molecules/DashBoardPaper';
// import DashBoardPaperPinned from '../molecules/DashBoardPaperPinned';
import Progress from '../atoms/CircularProgress';

import DiscordWidget from '../atoms/DiscordWidget';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    loading,
    error,
    fetchChallenges,
    fetchCategories
  } = props;

  React.useEffect(() => {
    fetchChallenges(4);
    fetchCategories(4);
  }, [fetchCategories, fetchChallenges]);

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
      /> */}
      {categories && (
        <DashBoardPaper
          title="人気のカテゴリ"
          items={categories}
          type="category"
        />
      )}
      {challenges && (
        <DashBoardPaper
          title="人気のチャレンジ"
          items={challenges}
          type="challenge"
        />
      )}
      <DiscordWidget />
    </React.Fragment>
  );
};

export default DashBoard;
