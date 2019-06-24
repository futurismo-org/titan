import * as React from 'react';
import { Button } from '@material-ui/core';

import styled from 'styled-components';

import { connect } from 'react-redux';
import axios from '../../lib/axios';

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 30px;
`;

const TwitterButton = (props: any) => {
  const { user } = props;

  const clickHandler = () => {
    axios
      .post('/twitter/post', {
        content: 'テスト投稿',
        accessTokenKey: user.twitterAccessTokenKey,
        accessTokenSecret: user.twitterAccessTokenSecret
      })
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

const mapStateToProps = (state: any, props: any) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(TwitterButton);
