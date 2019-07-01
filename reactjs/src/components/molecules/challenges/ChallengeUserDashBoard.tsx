import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import firebase from '../../../lib/firebase';

import Record from './ChallengePostRecord';
import ChallengeGrass from './ChallengeGrass';

import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import ChallengeHistories from './ChallengeHistories';
import ChallengeStatistics from './ChallengeStatistics';
import ChallengeChart from './ChallengeChart';
import TwitterButton from '../../atoms/TwitterButton';

const StyledCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChallengeUserDashBoard = (props: any) => {
  const { userId, challengeId, openedAt, closedAt, challengeTitle } = props;

  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const isDaysValid = (days: number) => {
    return days !== undefined && days !== null;
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
    return moment(startDate.toDate()).format('MM月DD日 HH:mm');
  };

  const DashBoardWrapper = styled.div`
    max-width: 750px;
    margin: auto;
  `;

  const data = value && value.data();

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <DashBoardWrapper>
          <StyledCenterContainer>
            <Title text={`${data.displayName} さんの記録`} />
            <Typography variant="h6">開始日: {formatDate(data)}</Typography>
            <div id="challenge-card">
              <Record days={formatDays(data.accDays)} />
            </div>
            <ChallengeStatistics
              data={data}
              openedAt={openedAt}
              closedAt={closedAt}
            />
            <ChallengeChart histories={data.histories} />
            <ChallengeGrass
              data={data}
              openedAt={openedAt}
              closedAt={closedAt}
            />
            <ChallengeHistories histories={data.histories} />
          </StyledCenterContainer>
          <TwitterButton
            title={challengeTitle}
            days={data.days}
            userId={userId}
            challengeId={challengeId}
          />
        </DashBoardWrapper>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  challengeId: props.match.params.challengeId,
  userId: props.match.params.userId,
  ...props
});

export default connect(mapStateToProps)(ChallengeUserDashBoard);
