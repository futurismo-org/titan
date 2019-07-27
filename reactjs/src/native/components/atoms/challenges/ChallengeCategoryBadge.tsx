import React, { useState } from 'react';

import { Badge, Text } from 'native-base';
import { Link } from 'react-router-native';
import firebase from '~/lib/firebase';

const ChallengeCategoryBadge = (props: any) => {
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

  return (
    <Badge>
      <Link to={path}>
        <Text>{title}</Text>
      </Link>
    </Badge>
  );
};

export default ChallengeCategoryBadge;
