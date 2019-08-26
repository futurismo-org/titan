import React, { useEffect } from 'react';
import { View, Text } from 'native-base';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import Progress from '~/native/components/atoms/CircularProgress';

const ChallengeNote = (props: any) => {
  const { challenge, user, fetchUserWithShortId, userShortId, loading } = props;

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
            >{`${user.displayName}さんの努力ノート`}</Text>
            <UserAvatar photoURL={user.photoURL} userId={user.shortId} small />
          </View>
          <Text />
        </View>
      )}
    </React.Fragment>
  );
};

export default ChallengeNote;
