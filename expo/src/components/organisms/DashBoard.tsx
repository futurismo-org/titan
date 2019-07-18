import * as React from 'react';
import { Text } from 'react-native';
import { H1 } from 'native-base';
import { useCollection } from 'react-firebase-hooks/firestore';
import Layout from '../templates/DefaultLayout';
import firebase from '../../lib/firebase';

const DashBoard = (props: any) => {
  const [value, loading, error] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .where('draft', '==', false)
      .orderBy('openedAt', 'desc')
      .limit(4)
  );

  const [value2, loading2, error2] = useCollection(
    firebase
      .firestore()
      .collection('categories')
      .orderBy('updatedAt', 'desc')
      .limit(4)
  );

  const [value3, loading3, error3] = useCollection(
    firebase
      .firestore()
      .collection('challenges')
      .where('pinned', '==', true)
  );

  return (
    <React.Fragment>
      {(error || error2 || error3) && <Text>Error: {error}</Text>}
      {(loading || loading2 || loading3) && <Text>Now Loading...</Text>}
      <Layout>
        <H1>運営からのおすすめ</H1>
        <H1>人気のカテゴリ</H1>
        <H1>人気のチャレンジ</H1>
        {value &&
          value.docs.map((doc: any) => (
            <Text key={doc.id}>{doc.data().title}</Text>
          ))}
      </Layout>
    </React.Fragment>
  );
};

export default DashBoard;
