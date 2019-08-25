import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import firebase from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const user = props.user;
  const userShortId = user.shortId;

  const challenge = props.challenge;
  const challengeId = challenge.id;

  const objective = state.firestore.data.objectiveChallenge;

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
    challengeId,
    handleSave,
    objective,
    isLoaded: isLoaded(objective),
    ...props
  };
};

const queries = (props: any) => {
  const { challengeId, userShortId } = props;

  if (!(challengeId && userShortId)) return [];

  return [
    {
      collection: 'objectives',
      doc: userShortId,
      storeAs: 'objectiveChallenge',
      subcollections: [
        {
          collection: 'challenges',
          doc: challengeId
        }
      ]
    }
  ];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(queries)
) as any;
