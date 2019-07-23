import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Text } from 'native-base';
import CollectionCard from '~/native/components/atoms/CollectionCard';

const CategoryChallenge = (props: any) => {
  const docRef: firebase.firestore.DocumentReference = props.challengeRef;

  const [value, loading, error] = useDocument(docRef);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && null}
      {value && (
        <React.Fragment>
          <CollectionCard collection={value.data()} type="challenges" small />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CategoryChallenge;
