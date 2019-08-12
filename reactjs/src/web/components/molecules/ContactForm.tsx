import React, { useState } from 'react';

import { TextField, Button } from '@material-ui/core';

const ContactForm = (props: any) => {
  const { isLogin, handler } = props;

  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const onTitleChange = (e: any) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const onEmailChange = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const onContentChange = (e: any) => {
    e.preventDefault();
    setContent(e.target.value);
  };

  const postHandler = (data: any) => {
    if (data.title === '' || data.content === '' || data.email === '') {
      window.alert('入力された情報が足りません。送信内容を確認してください。'); // eslint-disable-line
      return;
    }

    handler(data).then(
      () => window.alert('連絡が完了しました。返信をお待ちください。') // eslint-disable-line
    );
  };

  return (
    <React.Fragment>
      {isLogin ? (
        <React.Fragment>
          <TextField
            value={title}
            variant="outlined"
            margin="normal"
            required
            id="title"
            label="タイトル"
            fullWidth
            onChange={onTitleChange}
          />
          <TextField
            value={email}
            variant="outlined"
            margin="normal"
            required
            id="email"
            label="Email: 返信のために必要"
            fullWidth
            onChange={onEmailChange}
          />
          <TextField
            value={content}
            variant="outlined"
            margin="normal"
            required
            id="content"
            label="内容"
            fullWidth
            multiline
            rows={8}
            onChange={onContentChange}
          />
          <br />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ fontWeight: 'bold' }}
            onClick={() =>
              postHandler({
                content,
                email,
                title
              })
            }
          >
            送信
          </Button>
        </React.Fragment>
      ) : (
        <p>お問い合わせにはログインが必要です。</p>
      )}
    </React.Fragment>
  );
};

export default ContactForm;
