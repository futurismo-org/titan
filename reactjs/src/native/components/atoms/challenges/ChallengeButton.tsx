import React, { useState, useEffect } from 'react';
import { Button, Text } from 'native-base';

import { firestore } from 'firebase';
import firebase from '~/lib/firebase';

import { successToastWithNoRedirect } from '~/native/components/atoms/Toast';

const ChallengeButton = (props: any) => {
  const {
    challenge,
    user,
    join,
    resourceId,
    fetchParticipants,
    error,
    loading
  } = props;

  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetchParticipants(resourceId);
  }, [fetchParticipants, resourceId, reload]);

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
        successToastWithNoRedirect('チャレンジに参加しました');
      })
      .then(() => setReload(true));
  };

  const PostButton = (props: any) => (
    <React.Fragment>
      <Button success small rounded>
        <Text>記録</Text>
      </Button>
      <Button warning small rounded>
        <Text>リセット</Text>
      </Button>
    </React.Fragment>
  );

  const JoinButton = (props: any) => (
    <React.Fragment>
      <Button
        info
        small
        rounded
        onPress={() => joinHandler(challenge.id, challenge.title, user)}
      >
        <Text>参加</Text>
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

export default ChallengeButton;
