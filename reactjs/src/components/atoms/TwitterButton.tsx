import * as React from 'react';
import { Button } from '@material-ui/core';

import styled from 'styled-components';

import axios from '../../lib/axios';

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 30px;
`;

const TwitterButton = (props: any) => {
  const clickHandler = () => {
    axios
      .post('/twitter/post', {
        content: 'Hello, World'
      })
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  return (
    <ButtonWrapper>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={clickHandler}
      >
        Twitterでシェア
      </Button>
    </ButtonWrapper>
  );
};

export default TwitterButton;
