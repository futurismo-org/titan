import * as React from 'react';
import { Text } from 'react-native';
import { H1 } from 'native-base';
import Layout from '../templates/DefaultLayout';

const DashBoard = (props: any) => {
  return (
    <Layout>
      <H1>運営からのおすすめ</H1>
      <H1>人気のカテゴリ</H1>
      <H1>人気のチャレンジ</H1>
    </Layout>
  );
};

export default DashBoard;
