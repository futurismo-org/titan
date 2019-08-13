import React from 'react';
import Fab from '@material-ui/core/Fab';

import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from '~/lib/firebase';
import NoStyledLink from '../NoStyledLink';

import Error from '../Error';

const ChallengeCategoryButton = (props: any) => {
  const docRef: firebase.firestore.DocumentReference = props.categoryRef;

  const [value, loading, error] = useDocument(docRef);
  const category = value && value.data();

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && category && (
        <NoStyledLink to={`/cat/${category.id}/dashboard`}>
          <Fab
            variant="extended"
            style={{ fontWeight: 'bold' }}
            color="primary"
          >
            {category.title}
          </Fab>
        </NoStyledLink>
      )}
    </React.Fragment>
  );
};

export default ChallengeCategoryButton;
