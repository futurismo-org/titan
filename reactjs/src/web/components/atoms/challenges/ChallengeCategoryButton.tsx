import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';

import firebase from '~/lib/firebase';
import NoStyledLink from '../NoStyledLink';

const ChallengeCategoryButton = (props: any) => {
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
    <React.Fragment>
      <NoStyledLink to={path}>
        <Fab variant="extended" style={{ fontWeight: 'bold' }} color="primary">
          {title}
        </Fab>
      </NoStyledLink>
    </React.Fragment>
  );
};

export default ChallengeCategoryButton;
