import React, { useEffect } from 'react';
import { Text, View, Button } from 'native-base';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import UserAvatar from '../atoms/UserAvatar';
import { getTwitterProfileURL } from '~/lib/url';
import TouchableText from '../atoms/TouchableText';

import MuteButton from '~/native/containers/MuteButtonContainer';
import BlockButton from '~/native/containers/BlockButtonContainer';

const Profile = (props: any) => {
  const {
    fetchUserWithShortId,
    userShortId,
    user,
    error,
    loading,
    isLogin,
    isMyProfile
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && user && (
        <View>
          <Text
            style={{
              marginBottom: 12,
              marginTop: 6,
              fontWeight: 'bold',
              fontSize: 22
            }}
          >{`${user.displayName}さんのプロフィール`}</Text>
          <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
          {!!user.twitterUsername && (
            <Button style={{ marginVertical: 15 }} info small>
              <TouchableText
                text="Twitter"
                url={getTwitterProfileURL(user.twitterUsername)}
                external
              />
            </Button>
          )}
          <Text>コンテンツ準備中...</Text>
          {isLogin && !isMyProfile && (
            <View style={{ marginTop: 20, flex: 1, flexDirection: 'row' }}>
              <MuteButton user={user} />
              <View style={{ marginLeft: 10 }}>
                <BlockButton user={user} />
              </View>
            </View>
          )}
        </View>
      )}
    </React.Fragment>
  );
};

export default Profile;
