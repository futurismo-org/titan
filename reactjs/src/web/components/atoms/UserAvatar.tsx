import * as React from 'react';
import { Avatar } from '@material-ui/core';
import NoStyledLink from './NoStyledLink';

const UserAvatar = (props: any) => {
  const { photoURL, userId, large } = props;

  const path = userId ? `/u/${userId}` : '/users';
  const src = photoURL || 'https://titan-fire.com/anonymous.png';

  const style = large
    ? {
        margin: 10,
        width: 60,
        height: 60
      }
    : {};

  return (
    <NoStyledLink to={path}>
      <Avatar src={src} style={style} />
    </NoStyledLink>
  );
};

export default UserAvatar;
