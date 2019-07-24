import React, { useEffect } from 'react';

import { H1, H3, Text, Container } from 'native-base';

import TwitterButton from '../../atoms/TwitterButton';
import Progress from '~/native/components/atoms/CircularProgress';

const ChallengeUserDashBoard = (props: any) => {
  const {
    challenge,
    userShortId,
    joinDate,
    user,
    error,
    loading,
    fetchUser,
    resourceId
  } = props;

  useEffect(() => {
    fetchUser(resourceId);
  }, [fetchUser, resourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {user && (
        <Container style={{ alignItems: 'center' }}>
          <H1>{user.displayName}さんの記録</H1>
          <H3>参加日: {joinDate}</H3>
          <TwitterButton challenge={challenge} userShortId={userShortId} />
        </Container>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;
