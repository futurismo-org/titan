import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import Title from '../../atoms/Title';

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
      {loading && null}
      {!loading && user && challenge && (
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 20 }}
          >{`${user.displayName}さんの努力ノート`}</Text>
          <UserAvatar photoURL={user.photoURL} userId={user.shortId} />
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoal;
