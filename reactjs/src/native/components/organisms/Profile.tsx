import React, { useEffect } from 'react';
import { Text, View, Button } from 'native-base';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import UserAvatar from '../atoms/UserAvatar';
import { getTwitterProfileURL } from '~/lib/url';
import TouchableText from '../atoms/TouchableText';

const Profile = (props: any) => {
  const { fetchUserWithShortId, userShortId, user, error, loading } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  const twitterURL =
    user && user.twitterUsername && getTwitterProfileURL(user.twitterUsername);

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
          {user.twitterUsername && (
            <Button style={{ marginVertical: 15 }} info small>
              <TouchableText text="Twitter" path={twitterURL} />
            </Button>
          )}
          <Text>コンテンツ準備中...</Text>
        </View>
      )}
    </React.Fragment>
  );
};

export default Profile;
