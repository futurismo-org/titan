import React, { useState, useEffect } from 'react';

import { TextField, Button } from '@material-ui/core';
import { useDocument } from 'react-firebase-hooks/firestore';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import Title from '../../atoms/Title';
import firebase from '../../../lib/firebase';
import { getParticipantsUserId } from '../../../lib/resourceUtil';

import Progress from '../../atoms/CircularProgress';
import { getUserDashboardPath } from '../../../lib/urlUtil';

const db = firebase.firestore();

const ChallengeUserSettings = (props: any) => {
  const challengeId = props.match.params.challengeId;
  const userShortId = props.match.params.userShortId;
  const resourceId = getParticipantsUserId(challengeId, userShortId);

  const { user, push } = props;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const [displayName, setDisplayName] = useState('');
  const [pastDays, setPastDays] = useState('');

  const onDisplayNameChange = (e: any) => {
    e.preventDefault();
    setDisplayName(e.target.value);
  };

  const onPastDaysChange = (e: any) => {
    e.preventDefault();
    setPastDays(e.target.value);
  };

  const updateHandler = (e: any) => {
    e.preventDefault();

    const newData = {
      displayName,
      pastDays: parseInt(pastDays),
      updatedAt: new Date()
    };

    db.doc(resourceId)
      .update(newData)
      .then(() => window.alert('設定を更新しました。')) // eslint-disable-line
      .then(() => push(getUserDashboardPath(challengeId, userShortId)))
      .catch(() => window.alert('エラーが発生しました。')); // eslint-disable-line
  };

  const data = value && value.data();

  const initDisplayName = data && data.displayName;
  const initPastDays = data && data.pastDays;

  useEffect(() => {
    setDisplayName(initDisplayName ? initDisplayName : '');
    setPastDays(initPastDays ? initPastDays : '');
  }, [initDisplayName, initPastDays]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <React.Fragment>
          <Title text="ユーザ設定" />
          {user.shortId === userShortId ? (
            <form noValidate onSubmit={updateHandler}>
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
                value={pastDays}
                variant="outlined"
                margin="normal"
                id="pastAccDasy"
                label="過去連続日数"
                onChange={onPastDaysChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                投稿
              </Button>
            </form>
          ) : (
            <p>ログインが必要です。</p>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: {}) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(
  mapStateToProps,
  { push }
)(ChallengeUserSettings);
