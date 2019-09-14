import React, { useEffect } from 'react';

import { H1, Text, H2, Button } from 'native-base';

import { withRouter } from 'react-router-native';
import TwitterButton from '../../atoms/TwitterButton';
import Progress from '~/native/components/atoms/CircularProgress';
import ChallengeHistories from '~/native/components/molecules/challenges/ChallengeHistories';
// import ChallengeGrass from './ChallengeGrass';
import ChallengeChart from './ChallengeChart';
import ChallengeStatistics from './ChallengeStatistics';
import ChallengeRecord from './ChallengePostRecord';

import { formatDays } from '~/lib/challenge';
import { RECORD_OPTION_TIME } from '~/constants/strategy';
import ChallengeRecordTimeChart from './ChallengeRecordTimeChart';

const Space = () => <Text />;

const ChallengeUserDashBoard = (props: any) => {
  const {
    challenge,
    joinDate,
    user,
    error,
    loading,
    fetchParticipant,
    resourceId,
    deleteHistoryHandler,
    categoryPath,
    history,
    totalMinutesMessage,
    hoursByDay
  } = props;

  useEffect(() => {
    fetchParticipant(resourceId);
  }, [fetchParticipant, resourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {!loading && user && user.histories && (
        <React.Fragment>
          <H1 style={{ textAlign: 'center' }}>{user.displayName}さんの記録</H1>
          <Space />
          <ChallengeRecord
            days={formatDays(
              user.showMode === '過去連続日数' ? user.pastDays : user.accDays
            )}
          />
          <Space />
          <ChallengeStatistics
            data={user}
            openedAt={challenge.openedAt}
            closedAt={challenge.closedAt}
          />
          <Space />
          <ChallengeChart histories={user.histories} />
          <Space />
          {/* バグっているのでgrassはいったん封印 */}
          {/* <ChallengeGrass
            histories={user.histories}
            openedAt={challenge.openedAt}
            closedAt={challenge.closedAt}
          />
          <Space /> */}
          {challenge.recordOption === RECORD_OPTION_TIME && (
            <React.Fragment>
              <H2 style={{ textAlign: 'center' }}>{totalMinutesMessage}</H2>
              <ChallengeRecordTimeChart data={hoursByDay} />
            </React.Fragment>
          )}
          <H2 style={{ textAlign: 'center' }}>参加日: {joinDate}</H2>
          <Space />
          <ChallengeHistories
            histories={user.histories}
            handler={deleteHistoryHandler}
          />
          <Space />
          <TwitterButton challenge={challenge} userShortId={user.id} />
          <Space />
          <Button full rounded onPress={() => history.push(categoryPath)}>
            <Text>カテゴリ記録へ</Text>
          </Button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(ChallengeUserDashBoard);
