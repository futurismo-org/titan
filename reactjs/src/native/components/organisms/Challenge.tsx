import * as React from 'react';

import { Text } from 'native-base';

import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';

import Progress from '../atoms/CircularProgress';

const Challenge = (props: any) => {
  const { loading, error, fetchChallenge, resourceId, challenge } = props;

  React.useEffect(() => {
    fetchChallenge(resourceId);
  }, [fetchChallenge, resourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {challenge && (
        <React.Fragment>
          <Header challenge={challenge} />
          <Body challenge={challenge} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Challenge;
