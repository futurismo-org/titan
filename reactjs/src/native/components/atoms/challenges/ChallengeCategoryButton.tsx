import React from 'react';

import { Button, Text } from 'native-base';
import { withRouter } from 'react-router-native';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from '~/lib/firebase';

const ChallengeCategoryBadge = (props: any) => {
  const { history } = props;
  const docRef: firebase.firestore.DocumentReference = props.categoryRef;

  const [value, loading, error] = useDocument(docRef);

  const category = value && value.data();

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && null}
      {!loading && category && (
        <Button
          rounded
          style={{ margin: 2 }}
          onPress={() => history.replace(`/cat/${category.id}/dashboard`)}
        >
          <Text>{category.title}</Text>
        </Button>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeCategoryBadge);
