import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { firestore } from 'firebase';
import { fetchParticipantJoined } from '~/actions/participantAction';
import { fetchProfileCategory } from '~/actions/profileAction';

import { getParticipantId } from '~/lib/resource';

import firebase from '~/lib/firebase';
import { postMessage } from '~/lib/discord.client.api';

import { getCategoryId } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    { fetchParticipantJoined, fetchProfileCategory },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;
  const user = state.firebase.profile;
  const userShortId = user.shortId;
  const categoryId = getCategoryId(challenge.categoryRef);
  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;
  const resourceId = getParticipantId(challengeId, userShortId);

  const join = state.participant.exist;

  const redirectPath = `/c/${challengeId}/overview`;

  const categoryDays =
    state.profile.target && state.profile.target.days
      ? state.profile.target.days
      : 0;

  const joinHandler = () => {
    const newData = {
      id: userShortId,
      userId: user.id,
      userShortId,
      histories: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: user.displayName,
      twitterUsername: user.twitterUsername,
      photoURL: user.photoURL,
      score: 0,
      days: 0,
      maxDays: 0,
      accDays: 0,
      pastDays: categoryDays,
      challengeName: challenge.title
    };

    const newChallenge = {
      id: challengeId,
      createdAt: new Date(),
      updatedAt: new Date(),
      title: challenge.title,
      description: challenge.description,
      sensitive: challenge.sensitive ? challenge.sensitive : false,
      challengeId,
      userShortId,
      openedAt: challenge.openedAt,
      closedAt: challenge.closedAt,
      categoryId,
      userDisplayName: user.displayName
    };

    const newCategory = {
      id: categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
      sensitive: challenge.sensitive ? challenge.sensitive : false, // categoryの値はとれないが、まあchallengeがsensiveなら同じ
      ref: challenge.categoryRef,
      categoryId,
      userShortId,
      userDisplayName: user.displayName
    };

    return firebase
      .firestore()
      .runTransaction(async (transaction: firestore.Transaction) => {
        await firebase
          .firestore()
          .collection('challenges')
          .doc(challengeId)
          .get()
          .then((doc: firestore.DocumentSnapshot) => {
            const current: number = doc.data()!.participantsCount;
            doc.ref.update({ participantsCount: current + 1 });
            return doc;
          })
          .then((doc: firestore.DocumentSnapshot) => {
            const message = `${user.displayName}さんが${
              doc.data()!.title
            }に参加しました。 https://titan-fire.com/c/${challengeId}/u/${
              user.shortId
            }`;
            postMessage(doc.data()!.webhookURL, message);
          });

        await firebase
          .firestore()
          .collection('challenges')
          .doc(challengeId)
          .collection('participants')
          .doc(user.shortId)
          .set(newData);

        await firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .collection('challenges')
          .doc(challengeId)
          .set(newChallenge, { merge: true });

        await firebase
          .firestore()
          .collection('profiles')
          .doc(userShortId)
          .collection('categories')
          .doc(categoryId)
          .set(newCategory, { merge: true });
      });
  };

  return {
    join,
    loading: state.participant.loading,
    error: state.participant.error,
    user,
    resourceId,
    profileCategoryResourceId,
    joinHandler,
    redirectPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
