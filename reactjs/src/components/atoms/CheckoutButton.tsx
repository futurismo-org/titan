import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { Elements, StripeProvider } from 'react-stripe-elements';

import CheckoutForm from './CheckoutForm';

import theme from '../../lib/theme';

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

const CheckoutButton = (props: any) => {
  const { challengeId, user } = props;
  const [open, setOpen] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const STRIPE_PUB_KEY = process.env.REACT_APP_STRIPE_TEST_PUB_KEY as string;

  return (
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
              <CheckoutForm name={user.displayName} />
            </Elements>
          </StripeProvider>
        </StyledModalContent>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: {}) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(CheckoutButton);
