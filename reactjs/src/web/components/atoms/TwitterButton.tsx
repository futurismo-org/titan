import * as React from 'react';

import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import Link from './NoStyledExternalLink';

// import { TextField } from '@material-ui/core';
// import FormData from 'form-data';
// import domtoimage from 'dom-to-image';
// import axios from '~/lib/axios';
// import SimpleModal from '../molecules/SimpleModal';

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 30px;
`;

const TwitterButton = (props: any) => {
  const { challenge, userShortId } = props;

  const shareURL = `https://titan-fire.com/c/${challenge.id}/u/${userShortId}`;
  const title = challenge.title.replace('#', '%23');

  const buildTweetContent = `${title}参加中%0a${shareURL}`;
  const buildHashTags = `${challenge.hashtag}`.replace('#', '');

  // const [text, setText] = React.useState(buildTweetContent);

  // const submitHandler = (e: any) => {
  //   e.preventDefault();

  //   // TODO 文字数Check

  //   const node = document.getElementById('challenge-card')   // eslint-disable-line
  //   domtoimage.toPng(node as Node).then((dataURL: any) => {
  //     const data = new FormData();
  //     data.append('content', text);
  //     data.append('token', user.accessTokenKey);
  //     data.append('secret', user.accessTokenSecret);
  //     data.append('image', dataURL);

  //     axios
  //       .post('/twitter/post', data, {
  //         headers: {
  //           'content-type': `multipart/form-data`
  //         }
  //       })
  //       .then(() => window.alert('Twitterに投稿しました。')) // eslint-disable-line
  //       .catch(err => console.error(err));
  //   });
  // };

  // const onTextChange = (e: any) => {
  //   e.preventDefault();
  //   setText(e.target.value);
  // };

  const textBuilder = `https://twitter.com/intent/tweet?text=${buildTweetContent}&hashtags=${buildHashTags}`;

  return (
    <React.Fragment>
      <ButtonWrapper>
        <Link href={`${textBuilder}`}>
          <Button
            variant="contained"
            color="secondary"
            style={{ fontWeight: 'bold' }}
          >
            Twitterでシェア
          </Button>
        </Link>
      </ButtonWrapper>
      {/* {user.id === userId && user.accessTokenKey && user.accessTokenSecret ? (
        <ButtonWrapper>
          <SimpleModal
            buttonOptions={{
              size: 'large',
              variant: 'contained',
              color: 'secondary'
            }}
            buttonText="Twitterでシェア"
          >
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
              onClick={submitHandler}
            >
              投稿
            </Button>
          </SimpleModal>
        </ButtonWrapper>
      ) : null} */}
    </React.Fragment>
  );
};

export default TwitterButton;
