import * as React from 'react';

import { Text } from 'native-base';

import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';
import Navbar from '../molecules/challenges/ChallengeNavbar';

import Progress from '../atoms/CircularProgress';

const Challenge = (props: any) => {
  const {
    loading,
    error,
    fetchChallenge,
    resourceId,
    challenge,
    isLogin
  } = props;

  React.useEffect(() => {
    fetchChallenge(resourceId);
  }, [fetchChallenge, resourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {challenge && (
        <React.Fragment>
          <Header challenge={challenge} isLogin={isLogin} />
          <Navbar challenge={challenge} isLogin={isLogin} />
          <Body challenge={challenge} isLogin={isLogin} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Challenge;
