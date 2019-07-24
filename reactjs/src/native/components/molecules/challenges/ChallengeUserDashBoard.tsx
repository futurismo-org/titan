import React, { useEffect } from 'react';

import { Text } from 'native-base';

// import { Text } from 'native-base';
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
      {user ? (
        <React.Fragment>
          <Text>参加日: {joinDate}</Text>
          <TwitterButton challenge={challenge} userShortId={userShortId} />
        </React.Fragment>
      ) : (
        <Text>データが取得できません。</Text>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;
