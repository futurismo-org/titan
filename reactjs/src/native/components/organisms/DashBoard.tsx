import * as React from 'react';
import { Text } from 'react-native';
import CollectionCard from '../atoms/CollectionCard';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

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
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {!loading && (
        <React.Fragment>
          <Title text="運営からのおすすめ" />
          {pinned.map((pinned: any) => (
            <CollectionCard collection={pinned} key={pinned.id} />
          ))}
          <Title text="人気のカテゴリ" />
          {categories.map((category: any) => (
            <CollectionCard collection={category} key={category.id} />
          ))}
          <Title text="人気のチャレンジ" />
          {challenges.map((challenge: any) => (
            <CollectionCard collection={challenge} key={challenge.id} />
          ))}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
