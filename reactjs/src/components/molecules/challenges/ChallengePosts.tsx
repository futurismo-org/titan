import * as React from 'react';
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

  const writeRecord = (props: any) => {
    const { days, updatedAt } = props;
    if (updatedAt && moment(updatedAt.toDate()).isSame(now, 'day')) {
      window.alert('記録の投稿は1日1回までです。'); // eslint-disable-line
      return;
    }

    const tomorrow = days === undefined || isNaN(days) ? 1 : days + 1;

    const updateData: any = {
      days: tomorrow,
      updatedAt: now
    };

    if (days === 0) updateData.startDate = now;

    firebase
      .firestore()
      .doc(resourceId)
      .update(updateData);
  };

  const resetRecord = () => {
    firebase
      .firestore()
      .doc(resourceId)
      .update({
        days: 0,
        startDate: now,
        updatedAt: now
      });
  };

  const confirm = (days: any) => {
    if (days === undefined) return;

    if (window.confirm('本当にリセットしますか？')) { // eslint-disable-line
      resetRecord();
    }
  };

  const formatDays = (days: any) => {
    if (isNaN(days)) {
      return 0;
    }
    return days;
  };

  const formatDate = (props: any): string => {
    const { days, startDate } = props;
    if (days === undefined || days === 0 || startDate === undefined) {
      return 'なし';
    }
    return moment(startDate.toDate()).format('YYYY年MM月DD日 HH:mm');
  };

  const data = value && value.data();

  return (
    <StyledCenterContainer>
      {error && <strong>Error: {error}</strong>}
      {loading && <span>Collection: Loading...</span>}
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
              color="secondary"
              handleClick={() => confirm(data.days)}
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
