import * as React from 'react';
import { Avatar } from '@material-ui/core';
import NoStyledLink from './NoStyledLink';

const UserAvatar = (props: any) => {
  const { photoURL, userId, large, xlarge, to } = props;

  const path = to ? to : userId ? `/u/${userId}` : '/users';
  const src = photoURL || 'https://titan-fire.com/anonymous.png';

  const style = large
    ? {
        margin: 10,
        width: 60,
        height: 60
      }
    : xlarge
    ? {
        margin: 10,
        width: 120,
        height: 120
      }
    : {};

  return (
    <NoStyledLink to={path}>
      <Avatar src={src} style={style} />
    </NoStyledLink>
  );
};

export default UserAvatar;
