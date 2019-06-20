import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { firestore } from 'firebase';
import firebase from '../../lib/firebase';

import NoStyledLink from './NoStyledLink';

const joinHandler = (props: any) => {
  const { challengeId, user } = props;
  const newData = {
    id: user.id,
    histories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    displayName: user.displayName,
    photoURL: user.photoURL,
    score: 0,
    days: 0
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
        .doc(user.id)
        .set(newData)
        .then(() => {
          window.alert('チャレンジに参加しました'); // eslint-disable-line
        })
        .then(() => {
          window.location.reload(); // eslint-disable-line
        });
    })
    .then(() => console.log('successfully updated'));
};

const JoinButton = (props: any) => {
  const { challengeId, user } = props;
  const [join, setJoin] = useState(false);

  const renderJoinButton = (props: any) => (
    <React.Fragment>
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        onClick={() => joinHandler(props)}
      >
        参加する
      </Button>
    </React.Fragment>
  );

  const renderPostButton = (props: any) => (
    <NoStyledLink to={`/challenges/${props.id}/posts`}>
      <Button color="inherit" variant="outlined" size="small">
        投稿
      </Button>
    </NoStyledLink>
  );

  if (challengeId === undefined || user.id === undefined) {
    return <div />;
  }

  firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .collection('participants')
    .where('id', '==', user.id)
    .get()
    .then((s: any) => setJoin(!s.empty));

  return join
    ? renderPostButton({ id: challengeId })
    : renderJoinButton({ user, challengeId });
};

const mapStateToProps = (state: any, props: {}) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(JoinButton);
