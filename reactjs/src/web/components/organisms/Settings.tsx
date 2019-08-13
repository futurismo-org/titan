import React, { useState, useEffect } from 'react';
import Switch from '@material-ui/core/Switch';

import { TextField, Button } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import { primaryColor, brandDark } from '~/lib/theme';

import Mutes from '~/web/containers/MutesContainer';
import Blocks from '~/web/containers/BlocksContainer';

const Settings = (props: any) => {
  const { user, updateHandler, isLogin } = props;

  const [displayName, setDisplayName] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [file, setFile] = useState(null);
  const [allowSensitive, setAllowSensitive] = useState(false);
  const [introduction, setIntroduction] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onTwitterUsernameChange = (e: any) => {
    e.preventDefault();
    setTwitterUsername(e.target.value);
  };

  const onIntroductionChange = (e: any) => {
    e.preventDefault();
    setIntroduction(e.target.value);
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
    if (data.introduction.length > 300) {
      window.alert('自己紹介の文字数を確認してください。'); // eslint-disable-line
      return;
    }

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
    setIntroduction(user.introduction ? user.introduction : '');
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
              style={{ outlineColor: brandDark }}
              onChange={onDisplayNameChange}
            />
            <TextField
              value={twitterUsername}
              variant="outlined"
              margin="normal"
              id="twitterId"
              style={{ outlineColor: brandDark }}
              label="Twitterユーザ名"
              onChange={onTwitterUsernameChange}
            />
            <TextField
              value={introduction}
              variant="outlined"
              margin="normal"
              id="introduction"
              multiline
              rows={6}
              fullWidth
              style={{ outlineColor: brandDark }}
              label="自己紹介(300字まで)"
              onChange={onIntroductionChange}
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
            <Title text="セキュリティ・プライバシー設定" />
            <p>センシティブなコンテンツを表示する</p>
            <Switch
              checked={allowSensitive}
              onChange={onSensitiveChange}
              style={{ color: primaryColor }}
            />
            <p>ミュートしているユーザ</p>
            <Mutes />
            <p>ブロックしているユーザ</p>
            <Blocks />
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
                  introduction,
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
          <Title text="設定" />
          <p>ログインが必要です。</p>
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Settings;
