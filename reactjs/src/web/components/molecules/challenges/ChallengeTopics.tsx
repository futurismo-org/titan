import * as React from 'react';
import Topics from '~/web/containers/TopicsContainer';

const ChallengeTopics = (props: any) => (
  <Topics collection="challenges" collectionId={props.match.params.id} />
);

export default ChallengeTopics;
