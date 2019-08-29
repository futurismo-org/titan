import { connect } from 'react-redux';
import { firestore } from 'firebase';

import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import firebase, { isLogin } from '~/lib/firebase';
import { postMessage } from '~/lib/discord.client.api';

import { getCategoryId } from '~/lib/challenge';
import { postUserChallengeJoin } from '~/lib/getstream';

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;
  const profile = state.firebase.profile;
  const userShortId = profile.shortId;
  const categoryId = getCategoryId(challenge.categoryRef);

  const redirectPath = `/c/${challengeId}/overview`;

  const profileCategory = state.firestore.data.profileCategory;

  const categoryDays =
    isLoaded(profileCategory) &&
    !isEmpty(profileCategory) &&
    profileCategory.days
      ? profileCategory.days
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

    const newProfile = {
      id: userShortId,
      displayName: profile.displayName,
      updatedAt: new Date()
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
            doc.ref.update({
              participantsCount: current + 1,
              updatedAt: new Date()
            });
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
          .set(newProfile, { merge: true });

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
      })
      .then(() =>
        postUserChallengeJoin(userShortId, challengeId, { user: profile })
      );
  };

  return {
    loading: !isLoaded(profileCategory),
    user: profile,
    joinHandler,
    redirectPath,
    isLogin: isLogin(state),
    userShortId,
    categoryId,
    ...props
  };
};

const queries = (props: any) => {
  const { userShortId, categoryId } = props;

  if (!(userShortId && categoryId)) return [];

  return [
    {
      collection: 'profiles',
      doc: userShortId,
      storeAs: 'profileCategory',
      subcollections: [
        {
          collection: 'categories',
          doc: categoryId
        }
      ]
    }
  ];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(queries)
) as any;
