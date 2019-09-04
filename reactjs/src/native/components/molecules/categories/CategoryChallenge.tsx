import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import { Text } from 'native-base';
import CollectionCard from '~/native/containers/CollectionCardContainer';
import { isiOS } from '~/native/lib/native';

const CategoryChallenge = (props: any) => {
  const docRef: firebase.firestore.DocumentReference = props.challengeRef;

  const [value, loading, error] = useDocument(docRef);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && null}
      {value &&
        !value.data()!.freezed &&
        !value.data()!.draft &&
        !(isiOS && value.data()!.ios) && (
          <React.Fragment>
            <CollectionCard collection={value.data()} type="challenges" />
          </React.Fragment>
        )}
    </React.Fragment>
  );
};

export default CategoryChallenge;
