import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const user = props.user;
  const userShortId = user.shortId;
  const profile = state.firebase.profile;
  const isMyProfile = profile.shortId === userShortId;

  const challenge = props.challenge;
  const challengeId = challenge.id;

  const handleSave = (data: any) => {
    const resourceId = `/objectives/${userShortId}/challenges/${challengeId}`;

    const updateData = {
      id: challengeId,
      userShortId: userShortId,
      challengeId: challengeId,
      challengeTitle: challenge.title,
      userDisplayName: user.displayName,
      userPhotoURL: user.photoURL,
      updatedAt: new Date(),
      ...data
    };

    return firebase
      .firestore()
      .doc(resourceId)
      .set(updateData, { merge: true });
  };

  return {
    userShortId,
    isMyProfile,
    handleSave,
    loading: state.user.loading,
    error: state.user.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
