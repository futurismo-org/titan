import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchObjective } from '~/actions/objectiveAction';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchObjective
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const user = props.user;
  const userShortId = user.shortId;
  const profile = state.firebase.profile;
  const isMyProfile = profile.shortId === userShortId;

  const challenge = props.challenge;
  const challengeId = challenge.id;

  const objective = state.objective.target;

  const resourceId = `/objectives/${userShortId}/challenges/${challengeId}`;

  const handleSave = (data: any) => {
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
    resourceId,
    userShortId,
    isMyProfile,
    handleSave,
    objective,
    loading: state.objective.loading,
    error: state.objective.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
