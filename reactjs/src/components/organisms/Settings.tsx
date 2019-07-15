import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import { TextField, Button } from '@material-ui/core';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import firebase from '../../lib/firebase';

const db = firebase.firestore();

const Setting = (props: any) => {
  const { user } = props;

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

  const updateHandler = (e: any) => {
    e.preventDefault();

    const newData = {
      displayName,
      twitterUsername,
      updatedAt: new Date()
    };

    db.collection('users')
      .doc(user.id)
      .update(newData)
      .then(() => window.alert("設定を更新しました。")) // eslint-disable-line
      .catch(() => window.alert("エラーが発生しました。")) // eslint-disable-line
  };

  useEffect(() => {
    setDisplayName(user.displayName ? user.displayName : '');
    setTwitterUsername(user.twitterUsername ? user.twitterUsername : '');
  }, [user]);

  return (
    <React.Fragment>
      <Paper>
        <Title text="ユーザ設定" />
        {!user.isEmpty && user.isLoaded ? (
          <form noValidate onSubmit={updateHandler}>
            <TextField
              value={displayName}
              variant="outlined"
              margin="normal"
              required
              id="displayName"
              label="ユーザ名"
              autoFocus
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

const mapStateToProps = (state: any, props: any) => {
  return {
    user: state.firebase.profile,
    ...props
  };
};

export default connect(mapStateToProps)(Setting);
