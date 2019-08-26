import * as React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import * as firebaseui from 'firebaseui';
import firebase from '~/lib/firebase';

import theme from '~/lib/theme';
import { TITAN_TERMS_OF_USE, TITAN_PRIVACY_POLICY } from '~/constants/appInfo';

const StyledContainer = styled.div`
  && {
    margin: ${theme.spacing(1)}px;
  }
`;

const Auth = (props: any) => {
  const { onClose, title, signInSuccessWithAuthResult, open } = props;

  const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: TITAN_TERMS_OF_USE,
    privacyPolicyUrl: TITAN_PRIVACY_POLICY,
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      signInSuccessWithAuthResult,
      onClose
    }
  };

  return (
    <StyledContainer>
      <Dialog onClose={onClose} open={open}>
        <DialogTitle>
          <p style={{ textAlign: 'center' }}>{title}</p>
        </DialogTitle>
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

export default Auth;
