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

const AuthModal = (props: any) => {
  const handleClose = () => {
    props.onClose();
  };

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID
    ],
    callbacks: {
      signInSuccessWithAuthResult: (
        credentials: firebase.auth.UserCredential
      ) => {
        const user = credentials.user;

        const data = {
          id: user!.uid,
          displayName: user!.displayName,
          photoURL: user!.photoURL,
          email: user!.email,
          createdAt: new Date(),
          updatedAt: new Date(),
          twitterURL: (credentials.additionalUserInfo!.profile! as any).url
        };

        const userRef = firebase
          .firestore()
          .collection('users')
          .doc(user!.uid);

        userRef.get().then(docSnapshot => {
          if (!docSnapshot.exists) {
            userRef.set(data);
          }
        });

        return false;
      }
    }
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
