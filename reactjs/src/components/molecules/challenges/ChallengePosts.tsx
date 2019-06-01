import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
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
  const [startDate, setStartDate] = useState('');

  const writeRecord = () => 1;
  const resetRecord = () => 1;

  const confirm = () => {
    if (window.confirm('本当にリセットしますか？')) { // eslint-disable-line
      resetRecord();
    }
  };

  const days = (): number => {
    if (startDate === '') {
      return 0;
    }
    return 0;
  };

  const formatDate = (datetime: string) => {
    if (datetime !== '') {
      return moment(datetime).format('YYYY年MM月DD日 HH:mm');
    }
    return 'なし';
  };

  return (
    <StyledCenterContainer>
      <Record days={days()} />
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

export default ChallengePosts;
