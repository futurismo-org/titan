import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { firestore } from 'firebase';
import { withRouter } from 'react-router-native';
import firebase from '~/lib/firebase';

import { successToast } from '~/native/components/atoms/Toast';
import ChallengePostController from '../../molecules/challenges/ChallengePostController';

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
    history
  } = props;

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchParticipants(resourceId);
    join && fetchUser(userResourceId);
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
    />
  );

  const JoinButton = (props: any) => (
    <React.Fragment>
      <Button
        info
        small
        rounded
        onPress={() => joinHandler(challenge.id, challenge.title, user)}
      >
        <Text>参加する</Text>
      </Button>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && null}
      {!loading ? join ? <PostButton /> : <JoinButton /> : null}
    </React.Fragment>
  );
};

export default withRouter(ChallengeButton);
