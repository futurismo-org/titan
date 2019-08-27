import { connect } from 'react-redux';
import shortId from 'shortid';
import firebase, { uploadPhotoURLAsync } from '~/lib/firebase';
import { getStreamToken } from '~/lib/getstream';

const mapStateToProps = (state: any, props: any) => {
  const signInSuccessWithAuthResult = (
    credentials: firebase.auth.UserCredential
  ) => {
    const { user } = credentials;

    const isTwitter =
      credentials.additionalUserInfo &&
      credentials.additionalUserInfo.providerId === 'twitter.com';

    const userRef = firebase
      .firestore()
      .collection('users')
      // uidにしないと、reduxのprofileとfirestoreのusersが同期しない。
      .doc(user!.uid);

    return userRef.get().then((doc: any) => {
      const userShortId = !doc.exists ? shortId.generate() : doc.data().shortId;

      const data = {
        id: user!.uid,
        shortId: userShortId,
        displayName: user!.displayName,
        photoURL: user!.photoURL,
        createdAt: new Date(),
        updatedAt: new Date(),
        twitterUsername: isTwitter
          ? (credentials.additionalUserInfo! as any).username
          : ''
      };

      if (!doc.exists) {
        userRef.set(data).then(() => {
          if (data.photoURL && data.photoURL !== '') {
            uploadPhotoURLAsync(
              data.photoURL,
              data.shortId,
              `/users/${data.id}`
            );
          }
        });
      }

      getStreamToken(user!.uid).then((token: any) => {
        const userId = user!.uid;
        const secureData = {
          id: userId,
          email: user!.email,
          getStreamToken: token,
          accessTokenKey: isTwitter
            ? (credentials.credential! as any).accessToken
            : '',
          accessTokenSecret: isTwitter
            ? (credentials.credential! as any).secret
            : '',
          updatedAt: new Date()
        };

        return firebase
          .firestore()
          .collection('securities')
          .doc(userId)
          .set(secureData, { merge: true });
      });
    });
  };

  return {
    signInSuccessWithAuthResult,
    ...props
  };
};

export default connect(mapStateToProps);
