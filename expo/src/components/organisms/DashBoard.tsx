import * as React from 'react';
import { Text } from 'react-native';
import Layout from '../templates/DefaultLayout';

const DashBoard = (props: any) => {
  return (
    <Layout>
      <Text>運営からのおすすめ</Text>
      <Text>人気のカテゴリ</Text>
      <Text>人気のチャレンジ</Text>
    </Layout>
  );
};

export default DashBoard;
