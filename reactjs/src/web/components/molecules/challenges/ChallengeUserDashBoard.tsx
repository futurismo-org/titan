import * as React from 'react';
import styled from 'styled-components';
import { Typography, Grid } from '@material-ui/core';

import ChallengeRecord from './ChallengePostRecord';
import ChallengeGrass from './ChallengeGrass';

import Progress from '../../atoms/CircularProgress';

import ChallengeHistories from './ChallengeHistories';
import ChallengeStatistics from './ChallengeStatistics';
import ChallengeChart from './ChallengeChart';
import TwitterButton from '../../atoms/TwitterButton';

import { formatDays } from '~/lib/challenge';
import PrimaryButton from '../../atoms/PrimaryButton';

const StyledCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DashBoardWrapper = styled.div`
  max-width: 750px;
  margin: auto;
`;

const ChallengeUserDashBoard = (props: any) => {
  const {
    challenge,
    joinDate,
    user,
    error,
    loading,
    fetchParticipant,
    resourceId,
    setOgpInfo,
    resetOgpInfo,
    deleteHistoryHandler,
    categoryPath
  } = props;

  const title = user ? `${user.displayName} さんの記録` : '';
  const description = `現在、${challenge.title}に参加中。`;
  const url = user
    ? `https://titan-fire.com/c/${challenge.id}/u/${user.id}`
    : 'https://titan-fire.com';

  React.useEffect(() => {
    fetchParticipant(resourceId);
    setOgpInfo({ title, description, url });

    return () => {
      resetOgpInfo();
    };
  }, [
    description,
    fetchParticipant,
    resetOgpInfo,
    resourceId,
    setOgpInfo,
    title,
    url
  ]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {!loading && !!user && (
        <DashBoardWrapper>
          <StyledCenterContainer>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="space-between"
            >
              <Grid item>
                <h2 style={{ textAlign: 'center' }}>{title}</h2>
                <div id="challenge-card">
                  <ChallengeRecord
                    days={formatDays(
                      user.showMode === '過去連続日数'
                        ? user.pastDays
                        : user.accDays
                    )}
                  />
                </div>
              </Grid>
              <Grid item>
                <ChallengeStatistics
                  data={user}
                  openedAt={challenge.openedAt}
                  closedAt={challenge.closedAt}
                />
              </Grid>
              <Grid item style={{ width: '100%', height: '100%' }}>
                <ChallengeChart histories={user.histories} />
              </Grid>
              <Grid item>
                <Typography variant="h6">参加日: {joinDate}</Typography>
              </Grid>
              <Grid item>
                <ChallengeGrass
                  histories={user.histories}
                  openedAt={challenge.openedAt}
                  closedAt={challenge.closedAt}
                />
              </Grid>
              <Grid item style={{ width: '100%', height: '100%' }}>
                <ChallengeHistories
                  histories={user.histories}
                  handler={deleteHistoryHandler}
                  option={challenge.recordOption}
                />
              </Grid>
            </Grid>
            <Grid
              container
              style={{ marginTop: 30 }}
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item>
                <TwitterButton challenge={challenge} userShortId={user.id} />
              </Grid>
              <Grid item style={{ marginLeft: 20 }}>
                <PrimaryButton text="カテゴリ記録へ" path={categoryPath} />
              </Grid>
            </Grid>
          </StyledCenterContainer>
        </DashBoardWrapper>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;
