import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';

import { TextField, Button } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import { primaryColor } from '~/lib/theme';

const Settings = (props: any) => {
  const { user, updateHandler, isLogin } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [file, setFile] = useState(null);
  const [allowSensitive, setAllowSensitive] = useState(false);

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

  const onSensitiveChange = (e: any) => {
    e.preventDefault();
    setAllowSensitive(e.target.checked);
  };

  const updateHandlerWithMessage = (data: any) => {
    updateHandler(data)
      .then(() => window.alert('ユーザ設定を更新しました。')) // eslint-disable-line
      .catch(
        () => window.alert('エラーが発生しました。') // eslint-disable-line
      );
  };

  useEffect(() => {
    setDisplayName(user.displayName ? user.displayName : '');
    setTwitterUsername(user.twitterUsername ? user.twitterUsername : '');
    setAllowSensitive(user.allowSensitive ? user.allowSensitive : false);
  }, [user]);

  return (
    <React.Fragment>
      {isLogin ? (
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
              label="Twitterユーザ名"
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
          </Paper>
          <br />
          <Paper>
            <Title text="セキュリティ・プライバシー" />
            <p>センシティブなコンテンツを表示する</p>
            <Switch
              checked={allowSensitive}
              onChange={onSensitiveChange}
              style={{ color: primaryColor }}
            />
            <p>ミュートしているユーザ</p>
            <p>ブロックしているユーザ</p>
          </Paper>
          <br />
          <Paper>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              style={{ fontWeight: 'bold' }}
              onClick={() =>
                updateHandlerWithMessage({
                  displayName,
                  twitterUsername,
                  file,
                  allowSensitive
                })
              }
            >
              設定を更新
            </Button>
          </Paper>
        </React.Fragment>
      ) : (
        <Paper>
          <Title text="ユーザ設定" />
          <p>ログインが必要です。</p>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Settings;
