import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const user = state.firebase.profile;
  const userId = user.id;

  const resourceId = `/users/${userId}`;

  const isLogin = !user.isEmpty && user.isLoaded;

  const updateHandler = (data: any) => {
    const updateData = {
      displayName: data.displayName,
      twitterUsername: data.twitterUsername,
      updatedAt: new Date()
    };

    if (data.file) {
      const storageRef = firebase.storage().ref();
      const avatarImagesRef = storageRef.child(
        `users/${user.shortId}/avatar.png`
      );

      return avatarImagesRef
        .put(data.file)
        .then(() => avatarImagesRef.getDownloadURL())
        .then(url =>
          firebase
            .firestore()
            .doc(resourceId)
            .update({ ...updateData, photoURL: url })
        );
    }
    return firebase
      .firestore()
      .doc(resourceId)
      .update(updateData);
  };

  return {
    user,
    resourceId,
    isLogin,
    updateHandler,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
