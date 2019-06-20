import React from 'react';

import { CardElement, injectStripe } from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { firestore } from 'firebase';
import axios from '../../lib/axios';

import firebase from '../../lib/firebase';

const CardElementWrapper = styled.div`
  margin: 15px;
`;

type Props = {} & any;

const joinHandler = (challengeId: string, user: any) => {
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

class CheckoutForm extends React.PureComponent<Props> {
  state = { complete: false, price: 0 };

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.state.price = this.props.price || 0;
  }

  submit(event: any) {
    if (this.state.price !== 0) {
      this.props.stripe
        .createToken({
          name: this.props.name
        })
        .then((res: any) =>
          axios.post('/charge', {
            price: this.props.price,
            tokenId: res.token.id
          })
        )
        .then((res: any) => console.log('Purchase Complete!'))
        .then(() => joinHandler(this.props.challengeId, this.props.user))
        .catch((err: any) => console.error(err));
    } else {
      console.log('do nothing.');
      joinHandler(this.props.challengeId, this.props.user);
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <React.Fragment>
        <Typography component="h3" variant="h5">
          チャレンジ購入 {this.state.price}円
        </Typography>
        <p>支払いを完了しますか？</p>
        <CardElementWrapper>
          <CardElement style={{ base: { fontSize: '14px' } }} />
        </CardElementWrapper>
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={this.submit}
        >
          送信
        </Button>
      </React.Fragment>
    );
  }
}

export default injectStripe(CheckoutForm);
