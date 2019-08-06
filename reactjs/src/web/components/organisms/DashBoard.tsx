import * as React from 'react';
import DashBoardPaper from 'web/components/molecules/DashBoardPaper';
import Progress from 'web/components/atoms/CircularProgress';

import DiscordHistories from '../atoms/DiscordHistories';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    pinned,
    loading,
    error,
    fetchChallenges,
    fetchCategories,
    fetchPinnedChallenges
  } = props;

  React.useEffect(() => {
    fetchChallenges(4);
    fetchCategories(4);
    fetchPinnedChallenges();
  }, [fetchCategories, fetchChallenges, fetchPinnedChallenges]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {pinned && (
        <DashBoardPaper
          title="おすすめのチャレンジ"
          items={pinned}
          type="challenge"
        />
      )}
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
      <DiscordHistories channelId="591410583463526430" limit={4} />
    </React.Fragment>
  );
};

export default DashBoard;
