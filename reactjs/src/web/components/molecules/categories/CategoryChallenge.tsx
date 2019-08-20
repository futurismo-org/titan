import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import CollectionCard from '~/web/containers/CollectionCardContainer';

const CategoryChallenge = (props: any) => {
  const docRef: firebase.firestore.DocumentReference = props.challengeRef;

  const [value, loading, error] = useDocument(docRef);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <div />}
      {!loading && value && !value.data()!.freezed && (
        <React.Fragment>
          <CollectionCard type="challenges" collection={value.data()} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CategoryChallenge;
