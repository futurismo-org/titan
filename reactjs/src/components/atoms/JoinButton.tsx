import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import firebase from '../../lib/firebase';

const joinHandler = (props: any) => {
  const { challengeId, userId } = props;
  const userUnion = firebase.firestore.FieldValue.arrayUnion(userId);
  firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .update({
      participants: userUnion
    });
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
  const isJoin = (args: {
    participants: string[];
    userId: string;
  }): boolean => {
    return args.participants && args.participants.includes(args.userId);
  };

  const { challengeId, userId } = props;
  const [join, setJoin] = useState(false);

  firebase
    .firestore()
    .collection('challenges')
    .doc(challengeId)
    .get()
    .then((doc: any) => {
      setJoin(isJoin({ participants: doc.data().participants, userId }));
    });

  return join
    ? renderPostButton({ id: challengeId })
    : renderJoinButton({ userId, challengeId });
};

const mapStateToProps = (state: any, props: {}) => ({
  userId: state.firebase.profile.id,
  ...props
});

export default connect(mapStateToProps)(JoinButton);
