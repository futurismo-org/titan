import React, { useState, useEffect } from 'react';

import {
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Grid
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import TextField from '~/web/components/atoms/TextField';

import { ACC_DAYS, PAST_DAYS } from '~/lib/challenge';

import firebase from '~/lib/firebase';

import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';
import { brandDark } from '~/lib/theme';

const db = firebase.firestore();

const ChallengeUserSettings = (props: any) => {
  const {
    user,
    resourceId,
    redirectPath,
    fetchUser,
    error,
    loading,
    isLogin,
    history
  } = props;

  useEffect(() => {
    fetchUser(resourceId);
  }, [fetchUser, resourceId]);

  const [displayName, setDisplayName] = useState('');
  const [showMode, setShowMode] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onShowModeChange = (e: any) => {
    e.preventDefault();
    setShowMode(e.target.value);
  };

  const updateHandler = (e: any) => {
    e.preventDefault();

    const newData = {
      displayName,
      showMode,
      updatedAt: new Date()
    };

    db.doc(resourceId)
      .update(newData)
      .then(() => window.alert('設定を更新しました。')) // eslint-disable-line
      .then(() => history.push(redirectPath))
      .catch(() => window.alert('エラーが発生しました。')); // eslint-disable-line
  };

  const initDisplayName = user && user.displayName;
  const initShowMode = user && user.showMode;

  useEffect(() => {
    setDisplayName(initDisplayName || '');
    setShowMode(initShowMode || ACC_DAYS);
  }, [initDisplayName, initShowMode]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {user && (
        <React.Fragment>
          <Title text="ユーザ設定" />
          {isLogin ? (
            <form noValidate onSubmit={updateHandler}>
              <Grid container spacing={3}>
                <Grid item>
                  <TextField
                    value={displayName}
                    variant="outlined"
                    margin="normal"
                    required
                    id="displayName"
                    label="ユーザ名"
                    onChange={onDisplayNameChange}
                  />
                </Grid>
                <Grid item>
                  <FormControl component="fieldset">
                    <FormLabel component="legend">日数表示設定</FormLabel>
                    <RadioGroup
                      aria-label="日数表示"
                      name="showmode"
                      value={showMode}
                      onChange={onShowModeChange}
                    >
                      <FormControlLabel
                        value={ACC_DAYS}
                        control={<Radio />}
                        label={ACC_DAYS}
                      />
                      <FormControlLabel
                        value={PAST_DAYS}
                        control={<Radio />}
                        label={PAST_DAYS}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  投稿
                </Button>
              </Grid>
            </form>
          ) : (
            <p>ログインが必要です。</p>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeUserSettings);
