import React, { useState } from 'react';
import styled from 'styled-components';
import moment, { updateLocale } from 'moment';
import { connect } from 'react-redux';
import Record from './ChallengePostRecord';
import RecordButton from '../../atoms/ChallengeRecordButton';
import firebase from '../../../lib/firebase';

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
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(0);
  const { userId, challengeId } = props;

  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const writeRecord = () => {
    const updateDays = days + 1;
    const updateDate = days === 0 ? new Date().toISOString() : startDate;

    firebase
      .firestore()
      .doc(resourceId)
      .update({
        days: updateDays,
        startDate: updateDate,
        updatedAt: new Date()
      })
      .then(() => {
        setDays(updateDays);
        setStartDate(updateDate);
      });
  };

  const resetRecord = () => {
    firebase
      .firestore()
      .doc(resourceId)
      .update({
        days: 0,
        startDate: '',
        updatedAt: new Date()
      })
      .then(() => {
        setDays(0);
        setStartDate('');
      });
  };

  const confirm = () => {
    if (window.confirm('本当にリセットしますか？')) { // eslint-disable-line
      resetRecord();
    }
  };

  const formatDate = (datetime: string) => {
    if (datetime !== '') {
      return moment(datetime).format('YYYY年MM月DD日 HH:mm');
    }
    return 'なし';
  };

  return (
    <StyledCenterContainer>
      <Record days={days} />
      <h3>開始日: {formatDate(startDate)}</h3>
      <StyledTimerButtonContainer>
        <RecordButton
          text="記録する"
          color="primary"
          handleClick={writeRecord}
        />
        <RecordButton text="リセット" color="secondary" handleClick={confirm} />
      </StyledTimerButtonContainer>
    </StyledCenterContainer>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  userId: state.firebase.profile.id,
  challengeId: props.match.params.id
});

export default connect(mapStateToProps)(ChallengePosts);
