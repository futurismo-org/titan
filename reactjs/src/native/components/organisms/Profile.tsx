import React, { useEffect } from 'react';
import { Text, View, Content } from 'native-base';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import ProfileHeader from '../molecules/profiles/ProfileHeader';
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
        (user.freezed ? (
          <React.Fragment>
            <Content padder>
              <Title text="凍結しました" />
              <Text>
                このユーザは不適切なユーザと判断して運営が凍結しました。
              </Text>
            </Content>
          </React.Fragment>
        ) : blocked ? (
          <React.Fragment>
            <Content padder>
              <Title text="表示をブロックしました" />
              <Text>
                あなたはこのユーザからブロックされているため、プロフィールを閲覧できません。
              </Text>
            </Content>
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
