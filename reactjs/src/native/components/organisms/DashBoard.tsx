import * as React from 'react';
import { H1 } from 'native-base';
import Layout from '../templates/DefaultLayout';

const DashBoard = (props: any) => {
  return (
    <React.Fragment>
      <Layout>
        <H1>運営からのおすすめ</H1>
        <H1>人気のカテゴリ</H1>
        <H1>人気のチャレンジ</H1>
      </Layout>
    </React.Fragment>
  );
};

export default DashBoard;
