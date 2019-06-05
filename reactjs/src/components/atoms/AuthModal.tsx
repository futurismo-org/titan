import * as React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import firebase from '../../lib/firebase';

import theme from '../../lib/theme';

const StyledContainer = styled.div`
  && {
    margin: ${theme.spacing(1)}px;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  && {
    text-align: center;
  }
` as React.ComponentType<DialogTitleProps>;

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: (
      credentials: firebase.auth.UserCredential
    ) => {
      if (credentials.additionalUserInfo) {
        console.log(credentials.additionalUserInfo.profile);
      }
      return false;
    }
  }
};

const AuthModal = (props: any) => {
  const handleClose = () => {
    props.onClose();
  };

  const { onClose, title, ...other } = props;

  return (
    <StyledContainer>
      <Dialog
        onClose={handleClose}
        aria-labelledby="login-dialog-title"
        {...other}
      >
        <StyledDialogTitle>{title}</StyledDialogTitle>
        <DialogContent>
          {/* <StyledAuthBasicForm>
            {title === '登録' ? <SignUpForm /> : <LoginForm />}
          </StyledAuthBasicForm> */}
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </DialogContent>
      </Dialog>
    </StyledContainer>
  );
};

export default AuthModal;
