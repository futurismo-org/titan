import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

import NoStyledLink from './NoStyledLink';
import firebase from '../../lib/firebase';

const ColorButton = styled(Button)`
  && {
    font-size: 15px;
    margin: 5px;
  }
`;

const ChallengeCategoryLink = (props: any) => {
  const docRef: firebase.firestore.DocumentReference = props.categoryRef;

  const [title, setTitle] = useState('');
  const [path, setPath] = useState('');

  docRef
    .get()
    .then((doc: firebase.firestore.DocumentSnapshot) => doc.data())
    .then(category => {
      setTitle(category!.title);
      setPath(`/categories/${category!.id}`);
    });

  return (
    <React.Fragment>
      <ColorButton variant="contained" color="default">
        <NoStyledLink to={path}>{title}</NoStyledLink>
      </ColorButton>
    </React.Fragment>
  );
};

export default ChallengeCategoryLink;
