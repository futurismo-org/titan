import React, { useEffect } from 'react';

import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

const Profile = (props: any) => {
  const { fetchUserWithShortId, userShortId, user, error, loading } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {user && <Title text={`${user.displayName}さんのプロフィール`} />}
    </React.Fragment>
  );
};

export default Profile;
