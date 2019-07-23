import * as React from 'react';
import moment from 'moment';
import { useDocument } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { APP_URL } from 'constants/appInfo';
import firebase from 'lib/firebase';

import ChallengeRecord from './ChallengePostRecord';
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
  const {
    userId,
    challengeId,
    openedAt,
    closedAt,
    challengeTitle,
    hashtag
  } = props;

  const resourceId = `challenges/${challengeId}/participants/${userId}`;

  const [value, loading, error] = useDocument(
    firebase.firestore().doc(resourceId)
  );

  const isDaysValid = (days: number) => {
    return days !== undefined && days !== null && !isNaN(days);
  };

  const formatDays = (days: any) => {
    if (!isDaysValid(days)) {
      return 0;
    }
    return days;
  };

  const DashBoardWrapper = styled.div`
    max-width: 750px;
    margin: auto;
  `;

  const data = value && value.data();
  const accDays = data ? formatDays(data.accDays) : '0';
  const title = data ? `${data.displayName} さんの記録` : '';
  const description = `現在、${challengeTitle}に参加中。${accDays}日達成しました！`;
  const url = `${APP_URL}/c/${challengeId}/u/${userId}`;

  React.useEffect(() => {
    props.setOgpInfo({ title, description, url });

    return () => {
      props.resetOgpInfo();
    };
  }, [description, props, title, url]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {data && (
        <DashBoardWrapper>
          <StyledCenterContainer>
            <Title text={title} />
            <div id="challenge-card">
              <ChallengeRecord
                days={formatDays(
                  data && data.showMode === '過去連続日数'
                    ? data.pastDays
                    : data.accDays
                )}
              />
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
            <Typography variant="h6">
              参加日: {moment(data.createdAt.toDate()).format('MM月DD日')}
            </Typography>
            <ChallengeHistories histories={data.histories} />
          </StyledCenterContainer>
          <TwitterButton
            title={challengeTitle}
            days={data.days}
            userId={userId}
            challengeId={challengeId}
            hashtag={hashtag}
          />
        </DashBoardWrapper>
      )}
    </React.Fragment>
  );
};

export default ChallengeUserDashBoard;
