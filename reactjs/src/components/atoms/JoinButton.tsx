import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useCollection } from 'react-firebase-hooks/firestore';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../lib/firebase';

const createId = (userId: string, challengeId: string) =>
  `${userId}_${challengeId}`;

const joinHandler = (props: any) => {
  const { challengeId, userId } = props;
  const id = createId(userId, challengeId);
  const newData = {
    id,
    userId,
    challengeId,
    createdAt: new Date()
  };
  firebase
    .firestore()
    .collection('user_challenge_relations')
    .doc(id)
    .set(newData);
};

const leaveHandler = (props: any) => {
  const { challengeId, userId } = props;
  const id = createId(userId, challengeId);
  firebase
    .firestore()
    .collection('user_challenge_relations')
    .doc(id)
    .delete();
};

const renderJoinButton = (props: any) => (
  <Button
    color="inherit"
    variant="outlined"
    size="small"
    onClick={() => joinHandler(props)}
  >
    参加する
  </Button>
);

const renderLeaveButton = (props: any) => (
  <Button
    color="inherit"
    variant="outlined"
    size="small"
    onClick={() => leaveHandler(props)}
  >
    参加中
  </Button>
);

const StyledLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
    margin-left: 10px;
  }
`;

const renderPostButton = (props: any) => (
  <StyledLink to={`/challenges/${props.id}/posts`}>
    <Button color="inherit" variant="outlined" size="small">
      投稿
    </Button>
  </StyledLink>
);

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

  return join ? (
    <React.Fragment>
      {renderLeaveButton({ userId, challengeId })}
      {renderPostButton({ id: challengeId })}
    </React.Fragment>
  ) : (
    renderJoinButton({ userId, challengeId })
  );
};

const mapStateToProps = (state: any, props: {}) => ({
  userId: state.firebase.profile.id,
  ...props
});

export default connect(mapStateToProps)(JoinButton);
