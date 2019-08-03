import React, { useState, useEffect } from 'react';

import { TextField, Button } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';

const Settings = (props: any) => {
  const { user, updateHandler } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [file, setFile] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onTwitterUsernameChange = (e: any) => {
    e.preventDefault();
    setTwitterUsername(e.target.value);
  };

  const onFileChange = (e: any) => {
    e.preventDefault();
    setFile(e.target.files[0]);
  };

  const updateHandlerWithMessage = (data: any) => {
    const uploadData = {} as any;
    uploadData.displayName = data.displayName;
    uploadData.twitterUsername = data.twitterUsername;

    if (data.file !== '') {
      uploadData.file = data.file;
    }

    updateHandler(uploadData)
      .then(() => window.alert('ユーザ設定を更新しました。')) // eslint-disable-line
      .catch(
        () => window.alert('エラーが発生しました。') // eslint-disable-line
      );
  };

  useEffect(() => {
    setDisplayName(user.displayName ? user.displayName : '');
    setTwitterUsername(user.twitterUsername ? user.twitterUsername : '');
  }, [user]);

  console.log(file);

  return (
    <React.Fragment>
      <Paper>
        <Title text="ユーザ設定" />
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
        <div>
          <p>ユーザアイコンをアップロード</p>
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            onChange={onFileChange}
          />
        </div>
        <br />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() =>
            updateHandlerWithMessage({
              displayName,
              twitterUsername,
              file
            })
          }
        >
          投稿
        </Button>
      </Paper>
    </React.Fragment>
  );
};

export default Settings;
