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
  const defaultUserIcon =
    'https://firebasestorage.googleapis.com/v0/b/fir-clone-1a266.appspot.com/o/default-user-icons%2F1.png?alt=media&token=b5e090f4-d2b1-4544-92bd-379a3d22b470';

  return (
    <div>
      <StyledButton color="inherit">
        <StyledAvatar
          alt="profile image"
          src={`${user.photoURL || defaultUserIcon}`}
        />
        {user.displayName || defaultUserName}
      </StyledButton>
      <StyledButton color="inherit" onClick={googleSignOut}>
        ログアウト
      </StyledButton>
    </div>
  );
};

export default UserItem;
