import * as React from 'react';
import Topics from '../Topics';

const ChallengeTopics = (props: any) => (
  <Topics collection="challenges" collectionId={props.match.params.id} />
);

export default ChallengeTopics;
