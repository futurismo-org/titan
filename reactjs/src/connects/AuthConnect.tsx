import { connect } from 'react-redux';
import shortId from 'shortid';
import firebase, { uploadPhotoURLAsync } from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const signInSuccessWithAuthResult = (
    credentials: firebase.auth.UserCredential
  ) => {
    const { user } = credentials;

    const isTwitter =
      credentials.additionalUserInfo &&
      credentials.additionalUserInfo.providerId === 'twitter.com';

    const data = {
      id: user!.uid,
      shortId: shortId.generate(),
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
      twitterUsername: isTwitter
        ? (credentials.additionalUserInfo! as any).username
        : ''
    };

    const secureId = shortId.generate();
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

    return userRef.get().then(doc => {
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
  };

  return {
    signInSuccessWithAuthResult,
    ...props
  };
};

export default connect(mapStateToProps);
