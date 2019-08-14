import React, { useEffect } from 'react';
import { Text, View } from 'native-base';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import ProfileHeader from '../molecules/ProfileHeader';
import ProfileBody from '~/native/containers/ProfileBodyContainer';

const Profile = (props: any) => {
  const {
    fetchUserWithShortId,
    userShortId,
    user,
    error,
    loading,
    isLogin,
    isMyProfile,
    myUserId,
    fetchBlockingUsers,
    blocked
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
    fetchBlockingUsers(myUserId);
  }, [fetchBlockingUsers, fetchUserWithShortId, myUserId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading &&
        user &&
        (blocked ? (
          <React.Fragment>
            <Title text="表示をブロックしました" />
            <Text>
              あなたはこのユーザからブロックされているため、プロフィールを閲覧できません。
            </Text>
          </React.Fragment>
        ) : (
          <View>
            <ProfileHeader
              user={user}
              isLogin={isLogin}
              isMyProfile={isMyProfile}
            />
            <ProfileBody userShortId={userShortId} />
          </View>
        ))}
    </React.Fragment>
  );
};

export default Profile;
