import React, { useState } from 'react';

import { Button, Text } from 'native-base';
import { withRouter } from 'react-router-native';
import firebase from '~/lib/firebase';

const ChallengeCategoryBadge = (props: any) => {
  const { history } = props;
  const docRef: firebase.firestore.DocumentReference = props.categoryRef;

  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');

  docRef
    .get()
    .then((doc: firebase.firestore.DocumentSnapshot) => doc.data())
    .then(category => {
      setTitle(category!.title);
      setPath(`/cat/${category!.id}/dashboard`);
    });

  return title ? (
    <Button rounded style={{ margin: 2 }} onPress={() => history.push(path)}>
      <Text>{title}</Text>
    </Button>
  ) : null;
};

export default withRouter(ChallengeCategoryBadge);
