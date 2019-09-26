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

const onClickAppleButton = () => {
  const ENDPOINT_URL = 'https://appleid.apple.com';
  const url = new URL(ENDPOINT_URL);
  url.pathname = '/auth/authorize';

  url.searchParams.append('response_type', 'code+id_token');
  url.searchParams.append('client_id', 'com.futurismo.titan.web');
  url.searchParams.append(
    'redirect_uri',
    'https://titan-fire.com/apple/callback_auth'
  );

  window.location.href = url.toString(); // eslint-disable-line
};

const Auth = (props: any) => {
  const { onClose, title, signInSuccessWithAuthResult, open } = props;

  const uiConfig = {
    signInFlow: 'popup',
    // signInSuccessUrl: '/',
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
          <div style={{ textAlign: 'center' }}>
            <p>or</p>
            <div
              role="button"
              onClick={onClickAppleButton}
              style={{ cursor: 'pointer' }}
            >
              <img src="images/AppleIdButton.png" alt="AppleIDButton" />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </StyledContainer>
  );
};

export default Auth;
