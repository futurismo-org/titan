import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import firebase from '~/lib/firebase';
import {
  postUserChallengeObjective,
  deleteUserChallengeObjective
} from '~/lib/getstream';
import { getChallengeUserGoalPath } from '~/lib/url';

const mapStateToProps = (state: any, props: any) => {
  const user = props.user;
  const userShortId = user.shortId;

  const challenge = props.challenge;
  const challengeId = challenge.id;

  const objective = state.firestore.data.objectiveChallenge;

  const resourceId = `/objectives/${userShortId}/challenges/${challengeId}`;
  const editPath = getChallengeUserGoalPath(challengeId, userShortId) + '/edit';

  const profile = state.firebase.profile;
  const isMyProfile = userShortId === profile.shortId;

  return {
    resourceId,
    userShortId,
    challengeId,
    objective,
    editPath,
    isMyProfile,
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
