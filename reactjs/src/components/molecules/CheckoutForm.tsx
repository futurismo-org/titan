import React from 'react';
import { CardElement, injectStripe } from 'react-stripe-elements';

const CheckoutForm = (props: any) => {
  const submit = async (ev: any) => {
    // User clicked submit
  };

  return (
    <div className="checkout">
      <p>支払いを完了しますか？</p>
      <CardElement />
      <button type="button" onClick={submit}>
        Send
      </button>
    </div>
  );
};

export default injectStripe(CheckoutForm);
