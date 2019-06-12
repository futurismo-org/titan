import React, { useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { useDocument } from 'react-firebase-hooks/firestore';
import { ulid } from 'ulid';
import firebase from '../../../lib/firebase';

import Record from './ChallengePostRecord';
import RecordButton from '../../atoms/ChallengeRecordButton';
import ChallengeHistories from './ChallengeHistories';

import Progress from '../../atoms/CircularProgress';

import { postMessage } from '../../../lib/discord.client.api';

const StyledCenterContainer = styled.div`
  margin-top: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledTimerButtonContainer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: space-around;
`;

const ChallengePosts = (props: any) => {
  const { userId, challengeId, userName, webhookURL } = props;

  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const now = new Date();
  const isDaysValid = (days: number) => {
    return days !== undefined && days !== null && !isNaN(days);
  };

  const writeRecord = (props: any) => {
    const { days, updatedAt } = props;
    if (updatedAt && moment(updatedAt.toDate()).isSame(now, 'day')) {
      window.alert('記録の投稿は1日1回までです。'); // eslint-disable-line
      return;
    }

    const tomorrow = !isDaysValid(days) ? 1 : days + 1;

    const newHistory = {
      id: ulid(),
      timestamp: new Date(),
      content: ''
    };

    const updateData: any = {
      days: tomorrow,
      updatedAt: now,
      histories: firebase.firestore.FieldValue.arrayUnion(newHistory)
    };

    if (!isDaysValid(days)) updateData.startDate = now;

    firebase
      .firestore()
      .doc(resourceId)
      .update(updateData)
      .catch(error => console.error(error));
  };

  const resetRecord = () => {
    const resetData = {
      days: 0,
      startDate: null,
      updatedAt: now
    };

    firebase
      .firestore()
      .doc(resourceId)
      .update(resetData)
      .then(() => {
        const message = `${userName}さんがリセットしました`;
        postMessage(webhookURL, message);
      })
      .catch(error => console.error(error));
  };

  const confirm = (days: any) => {
    if (!isDaysValid(days)) return;

    if (window.confirm('本当にリセットしますか？')) { // eslint-disable-line
      resetRecord();
    }
  };

  const formatDays = (days: any) => {
    if (!isDaysValid(days)) {
      return 0;
    }
    return days;
  };

  const formatDate = (props: any): string => {
    const { days, startDate } = props;
    if (
      !isDaysValid(days) ||
      days === 0 ||
      startDate === undefined ||
      startDate === null
    ) {
      return 'なし';
    }
    return moment(startDate.toDate()).format('YYYY年MM月DD日 HH:mm');
  };

  const data = value && value.data();

  useEffect(() => {
    if (
      data !== undefined &&
      data.updatedAt !== undefined &&
      data.updatedAt !== null &&
      moment(now).diff(moment(data.updatedAt.toDate()), 'days') > 1
    ) {
      firebase
        .firestore()
        .doc(resourceId)
        .update({
          days: NaN,
          startDate: null,
          updatedAt: null
        })
        .then(() => window.alert('記録をリセットしました'));　// eslint-disable-line
    }
  }, [data, now, resourceId]);

  return (
    <StyledCenterContainer>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <React.Fragment>
          <Record days={formatDays(data.days)} />
          <h3>開始日: {formatDate(data)}</h3>
          <StyledTimerButtonContainer>
            <RecordButton
              text="記録する"
              color="primary"
              handleClick={() => writeRecord(data)}
            />
            <RecordButton
              text="リセット"
              color="inherit"
              handleClick={() => confirm(data.days)}
            />
          </StyledTimerButtonContainer>
          <ChallengeHistories histories={data.histories} />
        </React.Fragment>
      )}
    </StyledCenterContainer>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  userId: state.firebase.profile.id,
  userName: state.firebase.profile.displayName,
  challengeId: props.match.params.id,
  webhookURL: props.webhookURL
});

export default connect(mapStateToProps)(ChallengePosts);
