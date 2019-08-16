import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { firestore } from 'firebase';
import { fetchParticipants } from '~/actions/userAction';
import { fetchProfileCategory } from '~/actions/profileAction';

import { getParticipantsId } from '~/lib/resource';

import firebase from '~/lib/firebase';
import { postMessage } from '~/lib/discord.client.api';

import { getCategoryId } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants, fetchProfileCategory }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;
  const resourceId = getParticipantsId(challengeId);

  const user = state.firebase.profile;
  const userShortId = user.shortId;
  const participants = state.user.items;
  const categoryId = getCategoryId(challenge.categoryRef);
  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;

  const join =
    participants.filter((paritcipant: any) => paritcipant.id === userShortId)
      .length === 1;

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
      createdAt: new Date(),
      updatedAt: new Date(),
      title: challenge.title,
      description: challenge.description,
      sensitive: challenge.sensitive ? challenge.sensitive : false,
      challengeId,
      userShortId,
      openedAt: challenge.openedAt,
      closedAt: challenge.closedAt
    };

    const newCategory = {
      createdAt: new Date(),
      updatedAt: new Date(),
      sensitive: challenge.sensitive ? challenge.sensitive : false, // categoryの値はとれないが、まあchallengeがsensiveなら同じ
      ref: challenge.categoryRef,
      categoryId,
      userShortId
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
    loading: state.user.loading,
    error: state.user.error,
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
