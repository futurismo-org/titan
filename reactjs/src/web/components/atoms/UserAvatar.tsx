import * as React from 'react';
import { Avatar } from '@material-ui/core';
import NoStyledExternalLink from './NoStyledExternalLink';

const UserAvatar = (props: any) => {
  const { profileURL, photoURL } = props;

  const src = photoURL ? photoURL : 'https://titan-fire.com/anonymous.png';

  return (
    <NoStyledExternalLink href={profileURL}>
      <Avatar src={src} />
    </NoStyledExternalLink>
  );
};

export default UserAvatar;
