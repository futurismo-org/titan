import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';
import axios from '../../lib/axios';

type Props = {} & any;

class CheckoutForm extends React.PureComponent<Props> {
  state = { complete: false };

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event: any) {
    let { token } = await this.props.stripe.createToken({ name: 'Name' });

    axios
      .post('/charge', {
        headers: { 'Content-Type': 'text/plain' },
        body: token.id
      })
      .then((res: any) => console.log('Purchase Complete!'));
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <div className="checkout">
        <p>支払いを完了しますか？</p>
        <CardElement />
        <button type="button" onClick={this.submit}>
          送信
        </button>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
