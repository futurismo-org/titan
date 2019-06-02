import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import { useDocument } from 'react-firebase-hooks/firestore';
import firebase from '../../../lib/firebase';

import Record from './ChallengePostRecord';
import RecordButton from '../../atoms/ChallengeRecordButton';

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
  const { userId, challengeId } = props;
  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const now = new Date();
  const initDate = new Date(0);

  const [startDate, setStartDate] = useState(initDate);
  const [days, setDays] = useState(0);
  const [updatedAt, setUpdatedAt] = useState(initDate);

  const writeRecord = () => {
    if (updatedAt !== initDate && moment(updatedAt).isSame(now, 'day')) {
      window.alert('記録の投稿は1日１回までです。'); // eslint-disable-line
      return;
    }

    const _days = days + 1;
    const _startDate = days === 0 ? now : startDate;

    firebase
      .firestore()
      .doc(resourceId)
      .update({
        days: _days,
        startDate: _startDate,
        updatedAt: now
      })
      .then(() => {
        setDays(_days);
        setStartDate(_startDate);
        setUpdatedAt(now);
      });
  };

  const resetRecord = () => {
    firebase
      .firestore()
      .doc(resourceId)
      .update({
        days: 0,
        startDate: now,
        updatedAt: now
      })
      .then(() => {
        setDays(0);
        setStartDate(now);
        setUpdatedAt(now);
      });
  };

  const confirm = () => {
    if (window.confirm('本当にリセットしますか？')) { // eslint-disable-line
      resetRecord();
    }
  };

  const formatDate = (day: Date): string => {
    if (
      days === 0 ||
      (day === undefined || moment(day).isSame(initDate, 'day'))
    ) {
      return 'なし';
    }
    return moment(day).format('YYYY年MM月DD日 HH:mm');
  };

  useEffect(() => {
    firebase
      .firestore()
      .doc(resourceId)
      .get()
      .then((doc: any) => doc.data())
      .then((data: any) => {
        if (data === undefined || data.days === undefined) {
          setStartDate(initDate);
          setDays(0);
          setUpdatedAt(initDate);
        } else {
          console.log(data);
          setStartDate(data.startDate);
          setDays(data.days);
          setUpdatedAt(data.updatedAt);
        }
      });
  }, [initDate, resourceId]);

  return (
    <StyledCenterContainer>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {value && (
        <React.Fragment>
          <Record days={days} />
          <h3>開始日: {formatDate(startDate)}</h3>
          <StyledTimerButtonContainer>
            <RecordButton
              text="記録する"
              color="primary"
              handleClick={writeRecord}
            />
            <RecordButton
              text="リセット"
              color="secondary"
              handleClick={confirm}
            />
          </StyledTimerButtonContainer>
        </React.Fragment>
      )}
    </StyledCenterContainer>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  userId: state.firebase.profile.id,
  challengeId: props.match.params.id
});

export default connect(mapStateToProps)(ChallengePosts);
