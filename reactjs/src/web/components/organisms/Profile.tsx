import React, { useEffect } from 'react';

import Paper from '@material-ui/core/Paper';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import ProfileHeader from '../molecules/ProfileHeader';
import ProfileBody from '../molecules/ProfileBody';

const Profile = (props: any) => {
  const {
    fetchUserWithShortId,
    userShortId,
    user,
    error,
    loading,
    isMyProfile,
    isLogin,
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
          <Paper>
            <Title text="表示をブロックしました" />
            <p>
              あなたはこのユーザからブロックされているため、プロフィールを閲覧できません。
            </p>
          </Paper>
        ) : (
          <React.Fragment>
            <ProfileHeader
              user={user}
              isLogin={isLogin}
              isMyProfile={isMyProfile}
            />
            <ProfileBody user={user} />
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default Profile;
