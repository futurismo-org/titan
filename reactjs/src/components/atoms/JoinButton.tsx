import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useCollection } from 'react-firebase-hooks/firestore';
import { connect } from 'react-redux';
import firebase from '../../lib/firebase';

const JoinButton = (props: any) => {
  const { challengeId, userId } = props;
  const [join, setJoin] = useState(false);

  const [value, loading, error] = useCollection(
    firebase.firestore().collection('user_challenge_relations')
  );

  if (error) {
    return <strong>Error: {error}</strong>;
  }

  if (loading) {
    return <div />;
  }

  value &&
    challengeId &&
    userId &&
    value.query
      .where('challengeId', '==', challengeId)
      .where('userId', '==', userId)
      .get()
      .then((snapshot: any) => setJoin(!snapshot.empty));

  const renderJoinButton = () => (
    <Button color="inherit" variant="outlined" size="small">
      参加する
    </Button>
  );

  const renderLeaveButton = () => (
    <Button color="inherit" variant="outlined" size="small">
      参加中
    </Button>
  );

  return join ? renderLeaveButton() : renderJoinButton();
};

const mapStateToProps = (state: any, props: {}) => ({
  userId: state.firebase.profile.id,
  ...props
});

export default connect(mapStateToProps)(JoinButton);
