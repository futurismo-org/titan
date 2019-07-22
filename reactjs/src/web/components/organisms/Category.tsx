import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'lib/firebase';
import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import Progress from '../atoms/CircularProgress';

interface Props {
  match: {
    params: {
      id?: string;
    };
  };
}

const Category = (props: Props) => {
  const [value, loading, error] = useDocument(
    firebase
      .firestore()
      .collection('categories')
      .doc(props.match.params.id)
  );

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {value && (
        <React.Fragment>
          <Header category={value.data()} />
          <Body category={value.data()} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Category;
