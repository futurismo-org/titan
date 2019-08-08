import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import firebase from '~/lib/firebase';
import NoStyledLink from '../NoStyledLink';

const ColorButton = styled(Button)`
  && {
    font-size: 15px;
    margin: 5px;
  }
`;

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
      <ColorButton variant="contained" color="primary">
        <NoStyledLink to={path} style={{ fontWeight: 'bold' }}>
          {title}
        </NoStyledLink>
      </ColorButton>
    </React.Fragment>
  );
};

export default ChallengeCategoryButton;
