import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
// import styled from 'styled-components';
// import Modal from '@material-ui/core/Modal';
// import { Elements, StripeProvider } from 'react-stripe-elements';

import { withRouter } from 'react-router-dom';
// import CheckoutForm from '~/web/components/atoms/CheckoutForm';
import ChallengePostController from '~/web/containers/challenges/ChallengePostControllerContainer';
import { secondaryColor, brandWhite } from '~/lib/theme';

import Error from '../Error';

// function rand() {
//   return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//   const top = 50 + rand();
//   const left = 50 + rand();

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`
//   };
// }

// const StyledModalContent = styled.div`
//   && {
//     position: absolute;
//     width: 350px;
//     background-color: ${theme.palette.background.paper};
//     box-shadow: ${theme.shadows[5]}px;
//     padding: ${theme.spacing(4)}px;
//     outline: none;
//   }
// `;

const ChallengeButton = (props: any) => {
  const {
    challenge,
    user,
    join,
    profileCategoryResourceId,
    fetchProfileCategory,
    loading,
    error,
    joinHandler,
    redirectPath,
    history,
    isLogin
  } = props;

  const challengeId = challenge.id;
  const { price } = challenge;

  // const [open, setOpen] = useState(false);
  // const [modalStyle] = React.useState(getModalStyle);

  useEffect(() => {
    fetchProfileCategory(profileCategoryResourceId);
  }, [fetchProfileCategory, profileCategoryResourceId]);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  const handleJoin = () => {
    joinHandler()
      .then(() => window.alert('チャレンジに参加しました')) // eslint-disable-line
      .then(() => {
        history.replace('/');
        history.replace(redirectPath);
      });
  };

  // const STRIPE_PUB_KEY =
  //   process.env.APP_ENV === 'development'
  //     ? (process.env.REACT_APP_STRIPE_TEST_PUB_KEY as string)
  //     : (process.env.REACT_APP_STRIPE_PROD_PUB_KEY as string);

  const renderCheckoutButton = (props: any) => (
    <React.Fragment>
      <Button
        onClick={handleJoin}
        variant="contained"
        style={{
          backgroundColor: secondaryColor,
          color: brandWhite,
          fontWeight: 'bold',
          marginLeft: 10
        }}
      >
        参加
      </Button>
      {/* <Modal
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
                challengeName={title}
                joinHandler={joinHandler}
              />
            </Elements>
          </StripeProvider>
        </StyledModalContent>
      </Modal> */}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && join ? (
        <ChallengePostController
          userShortId={user.shortId}
          challenge={challenge}
        />
      ) : isLogin ? (
        renderCheckoutButton({ user, challengeId, price })
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(ChallengeButton);
