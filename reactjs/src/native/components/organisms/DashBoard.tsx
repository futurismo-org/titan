import * as React from 'react';
import { Text, ScrollView } from 'react-native';
import { H1 } from 'native-base';
import Layout from '../templates/DefaultLayout';
import CollectionCard from '../atoms/CollectionCard';
import Progress from '../atoms/CircularProgress';

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
      <Layout>
        {error && <Text>Error: {error}</Text>}
        {loading && <Progress />}
        {!loading && (
          <ScrollView>
            <H1>運営からのおすすめ</H1>
            {pinned.map((pinned: any) => (
              <CollectionCard collection={pinned} key={pinned.id} />
            ))}
            <H1>人気のカテゴリ</H1>
            {categories.map((category: any) => (
              <CollectionCard collection={category} key={category.id} />
            ))}
            <H1>人気のチャレンジ</H1>
            {challenges.map((challenge: any) => (
              <CollectionCard collection={challenge} key={challenge.id} />
            ))}
          </ScrollView>
        )}
      </Layout>
    </React.Fragment>
  );
};

export default DashBoard;
