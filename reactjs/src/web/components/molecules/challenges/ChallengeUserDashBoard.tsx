import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

import ChallengeRecord from './ChallengePostRecord';
import ChallengeGrass from './ChallengeGrass';

import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

import ChallengeHistories from './ChallengeHistories';
import ChallengeStatistics from './ChallengeStatistics';
import ChallengeChart from './ChallengeChart';
import TwitterButton from '../../atoms/TwitterButton';

import { formatDays } from '~/lib/challenge';

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
    fetchUser,
    resourceId,
    setOgpInfo,
    resetOgpInfo
  } = props;

  const title = user ? `${user.displayName} さんの記録` : '';
  const description = `現在、${challenge.title}に参加中。`;
  const url = user
    ? `https://titan-fire.com/c/${challenge.id} /u/${user.id}`
    : 'https://titan-fire.com';

  React.useEffect(() => {
    fetchUser(resourceId);
    setOgpInfo({ title, description, url });

    return () => {
      resetOgpInfo();
    };
  }, [
    description,
    fetchUser,
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
      {user && (
        <DashBoardWrapper>
          <StyledCenterContainer>
            <Title text={title} />
            <div id="challenge-card">
              <ChallengeRecord
                days={formatDays(
                  user.showMode === '過去連続日数'
                    ? user.pastDays
                    : user.accDays
                )}
              />
            </div>
            <ChallengeStatistics
              data={user}
              openedAt={challenge.openedAt}
              closedAt={challenge.closedAt}
            />
            <ChallengeChart histories={user.histories} />
            <ChallengeGrass
              histories={user.histories}
              openedAt={challenge.openedAt}
              closedAt={challenge.closedAt}
            />
            <Typography variant="h6">参加日: {joinDate}</Typography>
            <ChallengeHistories histories={user.histories} />
          </StyledCenterContainer>
          <TwitterButton challenge={challenge} userShortId={user.id} />
        </DashBoardWrapper>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;
