import React, { useEffect } from 'react';

import { H1, Text, H2 } from 'native-base';

import TwitterButton from '../../atoms/TwitterButton';
import Progress from '~/native/components/atoms/CircularProgress';
import ChallengeHistories from '~/native/components/molecules/challenges/ChallengeHistories';

const Space = () => <Text />;

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
        <React.Fragment>
          <H1 style={{ textAlign: 'center' }}>{user.displayName}さんの記録</H1>
          <Space />
          <H2 style={{ textAlign: 'center' }}>参加日: {joinDate}</H2>
          <Space />
          <ChallengeHistories histories={user.histories} />
          <Space />
          <TwitterButton challenge={challenge} userShortId={userShortId} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;
