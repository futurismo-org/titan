import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { firestore } from 'firebase';
import { fetchParticipants } from '~/actions/userAction';

import { getParticipantsId } from '~/lib/resource';

import firebase from '~/lib/firebase';
import { postMessage } from '~/lib/discord.client.api';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;
  const resourceId = getParticipantsId(challengeId);

  const user = state.firebase.profile;
  const userShortId = user.shortId;
  const participants = state.user.items;

  const join =
    participants.filter((paritcipant: any) => paritcipant.id === userShortId)
      .length === 1;

  const redirectPath = `/c/${challengeId}/overview`;

  const joinHandler = () => {
    const newData = {
      id: user.shortId,
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
      pastDays: 0,
      challengeName: challenge.title
    };

    const newChallenge = {
      createdAt: new Date(),
      updatedAt: new Date(),
      title: challenge.title,
      description: challenge.description,
      challengeId,
      userShortId,
      openedAt: challenge.openedAt,
      closedAt: challenge.closedAt
    };

    const updateUser = {
      updatedAt: new Date(),
      categories: firebase.firestore.FieldValue.arrayUnion(
        challenge.categoryRef
      ),
      challenges: firebase.firestore.FieldValue.arrayUnion(newChallenge)
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
          .collection('users')
          .doc(user.id)
          .update(updateUser);
      });
  };

  return {
    join,
    loading: state.user.loading,
    error: state.user.error,
    user,
    resourceId,
    joinHandler,
    redirectPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
