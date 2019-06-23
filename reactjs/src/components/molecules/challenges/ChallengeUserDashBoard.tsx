import * as React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import firebase from '../../../lib/firebase';

import Record from './ChallengePostRecord';
import ChallengeGrass from './ChallengeGrass';

import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';
import ChallengeHistories from './ChallengeHistories';

const StyledCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChallengeUserDashBoard = (props: any) => {
  const { userId, challengeId, openedAt, closedAt } = props;

  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  // const now = new Date();
  const isDaysValid = (days: number) => {
    return days !== undefined && days !== null && !isNaN(days);
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
    max-width: 960px;
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
            <Record days={formatDays(data.days)} />
            <Typography style={{ marginTop: '20px' }} variant="h6">
              開始日: {formatDate(data)}
            </Typography>
            <Grid container spacing={3}>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <NumberWidget title="スコア" number={data.score} unit="" />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <NumberWidget title="連続日数" number={data.days} unit="days" />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <NumberWidget
                  title="最長日数"
                  number={data.maxDays}
                  unit="days"
                />
              </Grid>
              <Grid item lg={3} md={3} sm={6} xs={6}>
                <NumberWidget title="順位" number={data.days} unit="位" />
              </Grid>
            </Grid>
            <ChallengeGrass
              data={data}
              openedAt={openedAt}
              closedAt={closedAt}
            />
            <ChallengeHistories histories={data.histories} />
          </StyledCenterContainer>
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
