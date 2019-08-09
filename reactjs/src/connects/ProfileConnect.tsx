import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import shortId from 'shortid';
import { fetchUserWithShortId } from '~/actions/userAction';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUserWithShortId
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.id;
  const user = state.user.target;
  const profile = state.firebase.profile;

  const isLogin = !profile.isEmpty && profile.isLoaded;
  const isMyProfile = profile.shortId === userShortId;

  const myResourceId = `/users/${user.id}`;

  const handleSensitiveListUpdate = (type: 'mute' | 'block') => () => {
    const newMuteDate = {
      id: shortId.generate(),
      createdAt: new Date(),
      userId: user.id,
      userShortId: user.shortId,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL
    };

    const updateData =
      type === 'mute'
        ? {
            muteList: firebase.firestore.FieldValue.arrayUnion(newMuteDate)
          } && { createdAt: new Date() }
        : {
            blockList: firebase.firestore.FieldValue.arrayUnion(newMuteDate)
          } && { createdAt: new Date() };

    return firebase
      .firestore()
      .doc(myResourceId)
      .update(updateData);
  };

  return {
    user,
    loading: state.user.loading,
    error: state.user.error,
    userShortId,
    isLogin,
    isMyProfile,
    handleSensitiveListUpdate,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
