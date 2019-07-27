import * as React from 'react';
import { Text } from 'react-native';
import CollectionCard from '../atoms/CollectionCard';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import MoreLink from '../atoms/MoreLink';

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
            <CollectionCard
              collection={pinned}
              type="challenges"
              key={pinned.id}
            />
          ))}
          <MoreLink to="/challenges" />
          <Title text="人気のカテゴリ" />
          {categories.map((category: any) => (
            <CollectionCard
              collection={category}
              type="categories"
              key={category.id}
            />
          ))}
          <MoreLink to="/categories" />
          <Title text="人気のチャレンジ" />
          {challenges.map((challenge: any) => (
            <CollectionCard
              collection={challenge}
              type="challenges"
              key={challenge.id}
            />
          ))}
          <MoreLink to="/challenges" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
