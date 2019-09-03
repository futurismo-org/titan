import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import ChallengeObjective from '~/native/containers/challenges/ChallengeObjectiveContainer';
import Progress from '~/native/components/atoms/CircularProgress';

const ChallengeGoal = (props: any) => {
  const {
    challenge,
    user,
    userShortId,
    fetchUserWithShortId,
    isMyProfile,
    loading
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading && user && challenge && (
        <View
          style={{
            paddingLeft: 25,
            paddingRight: 25
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Text
              style={{ fontWeight: 'bold', fontSize: 20 }}
            >{`${user.displayName}さんの目標`}</Text>
            <UserAvatar photoURL={user.photoURL} userId={user.shortId} small />
          </View>
          <Text />
          <ChallengeObjective
            challenge={challenge}
            user={user}
            isMyProfile={isMyProfile}
          />
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoal;
