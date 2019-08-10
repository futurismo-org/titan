import React, { useState, useEffect } from 'react';

import {
  TextField,
  Button,
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Grid
} from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import firebase from '~/lib/firebase';

import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

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
  const [pastDays, setPastDays] = useState('');
  const [showMode, setShowMode] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onPastDaysChange = (e: any) => {
    e.preventDefault();
    setPastDays(e.target.value);
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
      pastDays: parseInt(pastDays),
      updatedAt: new Date()
    };

    db.doc(resourceId)
      .update(newData)
      .then(() => window.alert('設定を更新しました。')) // eslint-disable-line
      .then(() => history.push(redirectPath))
      .catch(() => window.alert('エラーが発生しました。')); // eslint-disable-line
  };

  const initDisplayName = user && user.displayName;
  const initPastDays = user && user.pastDays;
  const initShowMode = user && user.showMode;

  useEffect(() => {
    setDisplayName(initDisplayName || '');
    setPastDays(initPastDays || '');
    setShowMode(initShowMode || '大会累積日数');
  }, [initDisplayName, initPastDays, initShowMode]);

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
                  <TextField
                    value={pastDays}
                    variant="outlined"
                    margin="normal"
                    id="pastAccDasy"
                    label="過去連続日数"
                    onChange={onPastDaysChange}
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
                        value="大会累積日数"
                        control={<Radio />}
                        label="大会累積日数"
                      />
                      <FormControlLabel
                        value="過去連続日数"
                        control={<Radio />}
                        label="過去連続日数"
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
