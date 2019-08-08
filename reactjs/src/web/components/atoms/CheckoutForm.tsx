import React from 'react';

// import { CardElement, injectStripe } from 'react-stripe-elements';
import { injectStripe } from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
// import styled from 'styled-components';
import { firestore } from 'firebase';
import axios from '~/lib/axios';

import firebase from '~/lib/firebase';
import { postMessage } from '~/lib/discord.client.api';

// const CardElementWrapper = styled.div`
//   margin: 15px;
// `;

type Props = {} & any;

const joinHandler = (challengeId: string, challengeName: string, user: any) => {
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
    pastDays: 0,
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

          const message = `${user.displayName}さんが${
            doc.data()!.title
          }に参加しました。 https://titan-fire.com/c/${challengeId}/u/${
            user.shortId
          }`;
          postMessage(doc.data()!.webhookURL, message);
        });
      await firebase
        .firestore()
        .collection('challenges')
        .doc(challengeId)
        .collection('participants')
        .doc(user.shortId)
        .set(newData);
    })
    .then(() => console.log('successfully updated'))
    .then(() => {
      window.alert('チャレンジに参加しました'); // eslint-disable-line
    })
    .then(() => {
      window.location.reload(); // eslint-disable-line
    });
};

class CheckoutForm extends React.PureComponent<Props> {
  state = {
    coupon: '',
    price: 0,
    isDiscount: false
  };

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
    this.apply = this.apply.bind(this);
    this.state.price = this.props.price || 0;

    const paymentRequest = this.props.stripe.paymentRequest({
      country: 'JP',
      currency: 'jpy',
      total: {
        label: 'チャレンジ参加料',
        amount: this.state.price
      },
      requestPayerName: false,
      requestPayerEmail: false
    });

    paymentRequest.on('token', (event: any) => {
      if (this.state.price > 50) {
        axios
          .post('/charges', {
            price: this.state.price,
            tokenId: event.token.id
          })
          .then((res: any) => console.log('Purchase Complete!'))
          .then((res: any) => event.complete('success'))
          .then(() =>
            joinHandler(
              this.props.challengeId,
              this.props.challengeName,
              this.props.user
            )
          )
          .catch((err: any) => {
            event.complete('fail');
            console.error(err);
          });
      } else {
        console.log('do nothing.');
        joinHandler(
          this.props.challengeId,
          this.props.challengeName,
          this.props.user
        );
      }
    });

    const elements = this.props.stripe.elements();
    const prButton = elements.create('paymentRequestButton', {
      paymentRequest
    });

    (async () => {
      // Check the availability of the Payment Request API first.
      const result = await paymentRequest.canMakePayment();
      if (result) {
        console.log('mount');
        prButton.mount('#payment-request-button');
      } else {
        console.log('none');
      }
    })();
  }

  onCouponChange = (e: any) => {
    e.preventDefault();
    this.setState({ coupon: e.target.value });
  };

  submit(event: any) {
    // if (this.props.price > 50) {
    //   this.props.stripe
    //     .createToken({
    //       name: this.props.name
    //     })
    //     .then((res: any) =>
    //       axios.post('/charges', {
    //         price: this.props.price,
    //         tokenId: res.token.id
    //       })
    //     )
    //     .then((res: any) => console.log('Purchase Complete!'))
    //     .then(() =>
    //       joinHandler(
    //         this.props.challengeId,
    //         this.props.challengeName,
    //         this.props.user
    //       )
    //     )
    //     .catch((err: any) => console.error(err));
    // } else {
    joinHandler(
      this.props.challengeId,
      this.props.challengeName,
      this.props.user
    );
    // }
  }

  apply() {
    if (this.state.coupon === '') return;
    if (this.state.price === 0) return;

    axios
      .post('/coupons/valid', {
        coupon: this.state.coupon
      })
      .then((res: any) => {
        console.log(res);
        if (res.data.valid && !this.state.isDiscount) {
          this.setState({ price: this.props.price - res.data.amount_off });
          this.setState({ isDiscount: true });
        }
      });
  }

  render() {
    return (
      <React.Fragment>
        <Typography component="h3" variant="h5">
          チャレンジ購入 {this.state.price}円
        </Typography>
        <h3>超重要</h3>
        <p>
          現在、価格モデル検討中のため、全てのチャレンジは無料で参加できます。購入ボタンをそのまま押してください。
        </p>
        {/* <div id="payment-request-button" />
        <p>クレジットカード決済</p>
        <CardElementWrapper>
          <CardElement style={{ base: { fontSize: '14px' } }} />
        </CardElementWrapper>
        <div style={{ display: 'flex' }}>
          <TextField
            label="クーポン"
            value={this.state.coupon}
            onChange={this.onCouponChange}
          />
          <Button
            color="default"
            variant="outlined"
            size="small"
            onClick={this.apply}
          >
            適用
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            onClick={this.submit}
          >
            送信
          </Button>
        </div> */}
        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={this.submit}
        >
          購入
        </Button>
      </React.Fragment>
    );
  }
}

export default injectStripe(CheckoutForm);
