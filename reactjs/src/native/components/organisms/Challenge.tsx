import * as React from 'react';

import Header from '../molecules/challenges/ChallengeHeader';
import Body from '../molecules/challenges/ChallengeBody';
import Navbar from '../molecules/challenges/ChallengeNavbar';

import Error from '../atoms/Error';

const Challenge = (props: any) => {
  const {
    loading,
    error,
    fetchChallenge,
    resourceId,
    challenge,
    isLogin,
    userShortId
  } = props;

  React.useEffect(() => {
    fetchChallenge(resourceId);
  }, [fetchChallenge, resourceId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {challenge && (
        <React.Fragment>
          <Header challenge={challenge} isLogin={isLogin} />
          <Navbar
            challenge={challenge}
            isLogin={isLogin}
            userShortId={userShortId}
          />
          <Body challenge={challenge} isLogin={isLogin} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Challenge;
