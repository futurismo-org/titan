import React, { useEffect } from 'react';

import { Follow } from 'react-twitter-widgets';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';
import UserAvatar from '../atoms/UserAvatar';

import MuteButton from '~/web/containers/MuteButtonContainer';
import BlockButton from '~/web/containers/BlockButtonContainer';

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
          <Paper>
            <Title text={`${user.displayName}さんのプロフィール`} />
            <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
            {!!user.twitterUsername && (
              <Follow username={user.twitterUsername} />
            )}
            <p>コンテンツ準備中...</p>
            {isLogin && !isMyProfile && (
              <React.Fragment>
                <div style={{ marginTop: 20, display: 'flex' }}>
                  <MuteButton user={user} />
                  <BlockButton user={user} />
                </div>
              </React.Fragment>
            )}
          </Paper>
        ))}
    </React.Fragment>
  );
};

export default Profile;
