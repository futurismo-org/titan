import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { firestore } from 'firebase';
import { fetchProfileCategory } from '~/actions/profileAction';

import firebase from '~/lib/firebase';
import { postMessage } from '~/lib/discord.client.api';

import { getCategoryId } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchProfileCategory }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;
  const profile = state.user.profile;
  const userShortId = profile.shortId;
  const categoryId = getCategoryId(challenge.categoryRef);
  const profileCategoryResourceId = `/profiles/${userShortId}/categories/${categoryId}`;

  const redirectPath = `/c/${challengeId}/overview`;

  const categoryDays =
    state.profile.target && state.profile.target.days
      ? state.profile.target.days
      : 0;

  const joinHandler = () => {
    const newData = {
      id: userShortId,
      userId: profile.id,
      userShortId,
      histories: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      displayName: profile.displayName,
      twitterUsername: profile.twitterUsername,
      photoURL: profile.photoURL,
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
      userDisplayName: profile.displayName,
      restartedAt: null
    };

    const newCategory = {
      id: categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
      sensitive: challenge.sensitive ? challenge.sensitive : false, // categoryの値はとれないが、まあchallengeがsensiveなら同じ
      ref: challenge.categoryRef,
      categoryId,
      userShortId,
      userDisplayName: profile.displayName
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
            const message = `${profile.displayName}さんが${
              doc.data()!.title
            }に参加しました。 https://titan-fire.com/c/${challengeId}/u/${userShortId}`;
            postMessage(doc.data()!.webhookURL, message);
          });

        await firebase
          .firestore()
          .collection('challenges')
          .doc(challengeId)
          .collection('participants')
          .doc(userShortId)
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

  const isLogin = !profile.isEmpty && profile.isLoaded;

  return {
    loading: state.participant.loadingExist,
    error: state.participant.errorExist,
    user: profile,
    profileCategoryResourceId,
    joinHandler,
    redirectPath,
    isLogin,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
