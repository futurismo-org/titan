import * as React from 'react';
import { useDocument } from 'react-firebase-hooks/firestore';
import ChallengeCard from '../../atoms/ChallengeCard';

const CategoryChallenge = (props: any) => {
  const docRef: firebase.firestore.DocumentReference = props.challengeRef;

  const [value, loading, error] = useDocument(docRef);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <div />}
      {value && (
        <React.Fragment>
          <ChallengeCard challenge={value.data()} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default CategoryChallenge;
