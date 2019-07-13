import * as React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import shortid from 'shortid';
import firebaseui from 'firebaseui';
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
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: 'https://titan-fire.com/terms_of_use.html',
    privacyPolicyUrl: 'https://titan-fire.com/privacy_policy.html',
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      signInSuccessWithAuthResult: (
        credentials: firebase.auth.UserCredential
      ) => {
        const { user } = credentials;

        console.log(credentials);

        const isTwitter =
          credentials.additionalUserInfo &&
          credentials.additionalUserInfo.providerId === 'twitter.com';

        const data = {
          id: user!.uid,
          shortId: shortid.generate(),
          displayName: user!.displayName,
          photoURL: user!.photoURL,
          email: user!.email,
          createdAt: new Date(),
          updatedAt: new Date(),
          twitterUsername: isTwitter
            ? (credentials.additionalUserInfo! as any).username
            : '',
          accessTokenKey: isTwitter
            ? (credentials.credential! as any).accessToken
            : '',
          accessTokenSecret: isTwitter
            ? (credentials.credential! as any).secret
            : ''
        };

        const userRef = firebase
          .firestore()
          .collection('users')
          // uidにしないと、reduxのprofileとfirestoreのusersが同期しない。
          .doc(user!.uid);

        userRef.get().then(doc => {
          if (!doc.exists || (doc && doc.data()!.accessTokenKey === '')) {
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
