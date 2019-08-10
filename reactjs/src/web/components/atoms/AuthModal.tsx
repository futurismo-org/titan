import * as React from 'react';
import { Dialog, DialogContent } from '@material-ui/core';
import DialogTitle, { DialogTitleProps } from '@material-ui/core/DialogTitle';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import styled from 'styled-components';
import shortid from 'shortid';
import * as firebaseui from 'firebaseui';

import firebase, { uploadPhotoURLAsync } from '~/lib/firebase';
import theme from '~/lib/theme';
import { TITAN_TERMS_OF_USE, TITAN_PRIVACY_POLICY } from '~/constants/appInfo';

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
      // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    tosUrl: TITAN_TERMS_OF_USE,
    privacyPolicyUrl: TITAN_PRIVACY_POLICY,
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    callbacks: {
      signInSuccessWithAuthResult: (
        credentials: firebase.auth.UserCredential
      ) => {
        const { user } = credentials;

        const isTwitter =
          credentials.additionalUserInfo &&
          credentials.additionalUserInfo.providerId === 'twitter.com';

        const data = {
          id: user!.uid,
          shortId: shortid.generate(),
          displayName: user!.displayName,
          photoURL: user!.photoURL,
          createdAt: new Date(),
          updatedAt: new Date(),
          twitterUsername: isTwitter
            ? (credentials.additionalUserInfo! as any).username
            : ''
        };

        const secureId = shortid.generate();
        const dataSecure = {
          id: secureId,
          email: user!.email,
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
          if (!doc.exists) {
            userRef.set(data);
            userRef
              .collection('securities')
              .doc(secureId)
              .set(dataSecure)
              .then(() => {
                if (data.photoURL && data.photoURL !== '') {
                  uploadPhotoURLAsync(
                    data.photoURL,
                    data.shortId,
                    `/users/${data.id}`
                  );
                }
              });
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
