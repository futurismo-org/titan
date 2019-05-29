import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';
import firebase from 'firebase/app';
import 'firebase/auth';

import styled from 'styled-components';
import theme from '../../lib/theme';

const StyledButton = styled(Button)`
  && {
    margin: ${theme.spacing(1)}px;
  }
` as React.ComponentType<ButtonProps>;

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    background-color: white;
  }
` as React.ComponentType<AvatarProps>;

const UserItem = (props: any) => {
  const googleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => (window.location.href = '/')); // eslint-disable-line 
  };

  const { user } = props;
  const defaultUserName = 'anonymous';
  const defaultUserIcon = `${process.env.PUBLIC_URL}/anonymous.png`;

  return (
    <div>
      <StyledButton color="inherit">
        <StyledAvatar
          alt="profile image"
          src={`${user.photoURL || defaultUserIcon}`}
        />
        {user.displayName || defaultUserName}
      </StyledButton>
      <StyledButton
        variant="outlined"
        size="small"
        color="inherit"
        onClick={googleSignOut}
      >
        ログアウト
      </StyledButton>
    </div>
  );
};

export default UserItem;
