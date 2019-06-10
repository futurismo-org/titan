import React from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import firebase from 'firebase/app';
import 'firebase/auth';

import styled from 'styled-components';
import Avatar from './Avatar';
import theme from '../../lib/theme';

const StyledButton = styled(Button)`
  && {
    margin: ${theme.spacing(0)}px;
    font-weight: bold;
  }
` as React.ComponentType<ButtonProps>;

const UserItem = (props: any) => {
  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => (window.location.href = '/')); // eslint-disable-line 
  };

  const { user } = props;
  // const defa/ultUserName = 'anonymous';

  return (
    <div>
      <StyledButton color="inherit">
        <Avatar src={user.photoURL} />{' '}
        {/* {user.displayName || defaultUserName} */}
      </StyledButton>
      <StyledButton
        variant="outlined"
        size="small"
        color="inherit"
        onClick={signOut}
      >
        ログアウト
      </StyledButton>
    </div>
  );
};

export default UserItem;
