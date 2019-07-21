import React, { useState, useEffect } from 'react';

import { TextField, Button } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';

const Settings = (props: any) => {
  const { user, isLogin, updateHandler } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onTwitterUsernameChange = (e: any) => {
    e.preventDefault();
    setTwitterUsername(e.target.value);
  };

  useEffect(() => {
    setDisplayName(user.displayName ? user.displayName : '');
    setTwitterUsername(user.twitterUsername ? user.twitterUsername : '');
  }, [user]);

  return (
    <React.Fragment>
      <Paper>
        <Title text="ユーザ設定" />
        {isLogin ? (
          <form
            noValidate
            onSubmit={() => updateHandler({ displayName, twitterUsername })}
          >
            <TextField
              value={displayName}
              variant="outlined"
              margin="normal"
              required
              id="displayName"
              label="ユーザ名"
              onChange={onDisplayNameChange}
            />
            <TextField
              value={twitterUsername}
              variant="outlined"
              margin="normal"
              id="twitterId"
              label="TwitterID"
              onChange={onTwitterUsernameChange}
            />
            <Button type="submit" fullWidth variant="contained" color="primary">
              投稿
            </Button>
          </form>
        ) : (
          <p>ログインが必要です。</p>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default Settings;
