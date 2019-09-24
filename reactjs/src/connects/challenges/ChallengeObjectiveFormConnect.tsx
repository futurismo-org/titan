import { connect } from 'react-redux';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import firebase from '~/lib/firebase';
import {
  postUserChallengeObjective,
  deleteUserChallengeObjective
} from '~/lib/getstream';

import { fetchUserWithShortId } from '../../actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUserWithShortId
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const user = state.user.target;

  const challenge = props.challenge;
  const challengeId = challenge.id;

  const objective = state.firestore.data.objectiveChallenge;
  const isEdit = objective && !!objective.what;

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
      .set(updateData, { merge: true })
      .then(async () => {
        if (isEdit) {
          await deleteUserChallengeObjective(userShortId, challengeId);
        }
        await postUserChallengeObjective(userShortId, challengeId, {
          user,
          what: data.what
        });
      });
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(queries)
) as any;
