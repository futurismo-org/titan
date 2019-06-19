import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
// import { makeStyles } from '@material-ui/core/styles';
import { Elements, StripeProvider } from 'react-stripe-elements';
import firebase from '../../lib/firebase';

import NoStyledLink from './NoStyledLink';

import theme from '../../lib/theme';
import CheckoutForm from '../molecules/CheckoutForm';

interface Props {
  challengeId: string;
  user: any;
}

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const StyledModalContent = styled.div`
  && {
    position: absolute;
    width: 400px;
    background-color: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[5]}px;
    padding: ${theme.spacing(4)}px;
    outline: none;
  }
`;

const joinHandler = (props: Props) => {
  console.log('join called');

  // const { challengeId, user } = props;
  // const newData = {
  //   id: user.id,
  //   histories: [],
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   displayName: user.displayName,
  //   photoURL: user.photoURL,
  //   score: 0,
  //   days: 0
  // };
  // firebase
  //   .firestore()
  //   .runTransaction(async (transaction: firestore.Transaction) => {
  //     await firebase
  //       .firestore()
  //       .collection('challenges')
  //       .doc(challengeId)
  //       .get()
  //       .then((doc: firestore.DocumentSnapshot) => {
  //         const current: number = doc.data()!.participantsCount;
  //         doc.ref.update({ participantsCount: current + 1 });
  //       });
  //     await firebase
  //       .firestore()
  //       .collection('challenges')
  //       .doc(challengeId)
  //       .collection('participants')
  //       .doc(user.id)
  //       .set(newData)
  //       .then(() => {
  //         window.alert('チャレンジに参加しました'); // eslint-disable-line
  //       })
  //       .then(() => {
  //         window.location.reload(); // eslint-disable-line
  //       });
  //   })
  //   .then(() => console.log('successfully updated'));
};

const JoinButton = (props: any) => {
  const { challengeId, user } = props;
  const [join, setJoin] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const STRIPE_PUB_KEY = process.env.REACT_APP_STRIPE_TEST_PUB_KEY as string;

  const renderJoinButton = (props: any) => (
    <React.Fragment>
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        // onClick={() => joinHandler(props)}
        onClick={handleOpen}
      >
        参加する
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <StyledModalContent style={modalStyle}>
          <StripeProvider apiKey={STRIPE_PUB_KEY}>
            <div>
              <h1>チャレンジ購入</h1>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
        </StyledModalContent>
      </Modal>
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
