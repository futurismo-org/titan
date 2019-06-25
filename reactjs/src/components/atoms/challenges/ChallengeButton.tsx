import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CheckoutForm from '../CheckoutForm';
import ChallengePosts from '../../molecules/challenges/ChallengePostController';
import theme from '../../../lib/theme';
import firebase from '../../../lib/firebase';

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
    width: 350px;
    background-color: ${theme.palette.background.paper};
    box-shadow: ${theme.shadows[5]}px;
    padding: ${theme.spacing(4)}px;
    outline: none;
  }
`;

const ChallengeButton = (props: any) => {
  const { challenge, user } = props;
  const challengeId = challenge.id;
  const { price } = challenge;
  const [join, setJoin] = useState(false);

  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const STRIPE_PUB_KEY =
    process.env.APP_ENV === 'development'
      ? (process.env.REACT_APP_STRIPE_TEST_PUB_KEY as string)
      : (process.env.REACT_APP_STRIPE_PROD_PUB_KEY as string);

  const MyButton = styled(Button)`
    && {
      font-size: 15px;
      margin: 5px;
    }
  `;

  const renderPostButton = () => (
    <React.Fragment>
      <MyButton
        color="inherit"
        variant="outlined"
        size="small"
        onClick={handleOpen}
      >
        投稿
      </MyButton>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <StyledModalContent style={modalStyle}>
          <ChallengePosts challenge={challenge} closeHandler={handleClose} />
        </StyledModalContent>
      </Modal>
    </React.Fragment>
  );

  const renderCheckoutButton = (props: any) => (
    <React.Fragment>
      <Button
        color="inherit"
        variant="outlined"
        size="small"
        onClick={handleOpen}
      >
        購入
      </Button>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <StyledModalContent style={modalStyle}>
          <StripeProvider apiKey={STRIPE_PUB_KEY}>
            <Elements>
              <CheckoutForm
                user={user}
                challengeId={challengeId}
                price={price}
              />
            </Elements>
          </StripeProvider>
        </StyledModalContent>
      </Modal>
    </React.Fragment>
  );

  if (challengeId === undefined || user.id === undefined) {
    return null;
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
    ? renderPostButton()
    : renderCheckoutButton({ user, challengeId, price });
};

const mapStateToProps = (state: any, props: {}) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(ChallengeButton);
