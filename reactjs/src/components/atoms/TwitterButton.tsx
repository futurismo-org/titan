import * as React from 'react';

import styled from 'styled-components';

import { connect } from 'react-redux';
import { Button, TextField } from '@material-ui/core';
import axios from '../../lib/axios';
import SimpleModal from '../molecules/SimpleModal';

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 30px;
`;

const TwitterButton = (props: any) => {
  const { user, title, days, userId, challengeId } = props;

  const shareURL = `https://titan-fire.com/challenges/${challengeId}/users/${userId}`;  // eslint-disable-line

  const buildTweetContent = () =>
    `${title}参加中
${days}日連続達成しました！ #titan
`;
  const [text, setText] = React.useState(buildTweetContent);

  const submitHandler = (e: any) => {
    e.preventDefault();

    // TODO 文字数Check

    axios
      .post('/twitter/post', {
        content: text,
        accessTokenKey: user.twitterAccessTokenKey,
        accessTokenSecret: user.twitterAccessTokenSecret
      })
      .then(() => window.alert('Twitterに投稿しました。')) // eslint-disable-line
      .catch(err => console.error(err));
  };

  const onTextChange = (e: any) => {
    e.preventDefault();
    setText(e.target.value);
  };

  return (
    <React.Fragment>
      {user.id === userId &&
      user.twitterAccessTokenKey &&
      user.twitterAccessTokenSecret ? (
        <ButtonWrapper>
          <SimpleModal
            buttonOptions={{
              size: 'large',
              variant: 'contained',
              color: 'secondary'
            }}
            buttonText="Twitterでシェア"
          >
            <form noValidate onSubmit={submitHandler}>
              <TextField
                value={text}
                variant="outlined"
                margin="normal"
                fullWidth
                id="text"
                name="text"
                label="投稿内容"
                rows={4}
                multiline
                onChange={onTextChange}
              />
              <Button
                type="submit"
                color="secondary"
                fullWidth
                variant="contained"
              >
                投稿
              </Button>
            </form>
          </SimpleModal>
        </ButtonWrapper>
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(TwitterButton);
