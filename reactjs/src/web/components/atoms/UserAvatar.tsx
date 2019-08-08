import * as React from 'react';
import { Avatar } from '@material-ui/core';
import NoStyledLink from './NoStyledLink';

const UserAvatar = (props: any) => {
  const { photoURL, userId } = props;

  const path = userId ? `/u/${userId}` : '/users';

  const src = photoURL || 'https://titan-fire.com/anonymous.png';

  return (
    <NoStyledLink to={path}>
      <Avatar src={src} />
    </NoStyledLink>
  );
};

export default UserAvatar;
