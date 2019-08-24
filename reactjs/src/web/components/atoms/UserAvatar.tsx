import * as React from 'react';
import { Avatar } from '@material-ui/core';
import NoStyledLink from './NoStyledLink';
import { ANONYMOUS_AVATAR_URL } from '~/lib/url';

const UserAvatar = (props: any) => {
  const { photoURL, userId, large, xlarge, to } = props;

  const path = to ? to : userId ? `/u/${userId}` : '/users';
  const src = photoURL || ANONYMOUS_AVATAR_URL;

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
