import React, { useEffect } from 'react';

import { Follow } from 'react-twitter-widgets';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';
import UserAvatar from '../atoms/UserAvatar';

const Profile = (props: any) => {
  const { fetchUserWithShortId, userShortId, user, error, loading } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && user && (
        <Paper>
          <Title text={`${user.displayName}さんのプロフィール`} />
          <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
          <Follow username={user.twitterUsername} />
          <p>コンテンツ準備中...</p>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Profile;
