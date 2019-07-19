import * as React from 'react';
import { Text } from 'react-native';
import { H1 } from 'native-base';
import Layout from '../templates/DefaultLayout';
import CollectionCard from '../atoms/CollectionCard';

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
      {loading && <Text>Now Loading...</Text>}
      <Layout>
        <H1>運営からのおすすめ</H1>
        <H1>人気のカテゴリ</H1>
        <H1>人気のチャレンジ</H1>
        {challenges &&
          challenges.map((challenge: any) => (
            <CollectionCard collection={challenge} key={challenge.id} />
          ))}
      </Layout>
    </React.Fragment>
  );
};

export default DashBoard;
