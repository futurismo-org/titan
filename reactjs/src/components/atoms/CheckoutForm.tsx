import React from 'react';

import { CardElement, injectStripe } from 'react-stripe-elements';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import axios from '../../lib/axios';

const CardElementWrapper = styled.div`
  margin: 15px;
`;

type Props = {} & any;

class CheckoutForm extends React.PureComponent<Props> {
  state = { complete: false };

  constructor(props: any) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  async submit(event: any) {
    let { token } = await this.props.stripe.createToken({
      name: this.props.name
    });

    axios
      .post('/charge', {
        body: token.id
      })
      .then((res: any) => console.log('Purchase Complete!'));
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>;

    return (
      <React.Fragment>
        <Typography component="h3" variant="h5">
          チャレンジ購入
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
