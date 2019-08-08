import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { firestore } from 'firebase';
import { withRouter } from 'react-router-native';
import firebase from '~/lib/firebase';

import { successToast } from '~/native/components/atoms/Toast';
import ChallengePostController from '../../molecules/challenges/ChallengePostController';

import { postMessage } from '~/lib/discord.client.api';

import Error from '../Error';

const ChallengeButton = (props: any) => {
  const {
    challenge,
    user,
    join,
    resourceId,
    fetchParticipants,
    error,
    loading,
    fetchUser,
    userResourceId,
    participant,
    redirectPath,
    history,
    showGiphy
  } = props;

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchParticipants(resourceId);
    if (join) {
      fetchUser(userResourceId);
    }
  }, [fetchParticipants, resourceId, fetchUser, userResourceId, join, refresh]);

  const joinHandler = (
    challengeId: string,
    challengeName: string,
    user: any
  ) => {
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
      challengeName
    };

    firebase
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
      })
      .then(() => {
        successToast(
          `/c/${challengeId}/overview`,
          history.push,
          'チャレンジに参加しました'
        );
      })
      .then(() => setRefresh(!refresh));
  };

  const PostButton = (props: any) => (
    <ChallengePostController
      challenge={challenge}
      fetchUser={fetchUser}
      resourceId={userResourceId}
      participant={participant}
      redirectPath={redirectPath}
      showGiphy={showGiphy}
    />
  );

  const JoinButton = (props: any) => (
    <React.Fragment>
      <Button
        info
        style={{ margin: 2 }}
        onPress={() => joinHandler(challenge.id, challenge.title, user)}
      >
        <Text>参加する</Text>
      </Button>
    </React.Fragment>
  );

  const renderButton = () => (join ? <PostButton /> : <JoinButton />);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading ? renderButton() : null}
    </React.Fragment>
  );
};

export default withRouter(ChallengeButton);
