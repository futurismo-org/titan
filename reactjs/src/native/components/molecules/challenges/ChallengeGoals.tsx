import React, { useState, useEffect } from 'react';
import { Text, Content, View } from 'native-base';
import Title from '../../atoms/Title';

import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import UserAvatar from '../../atoms/UserAvatar';
import { getChallengeUserGoalPath } from '~/lib/url';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';

const ChallengeGoals = (props: any) => {
  const {
    fetchParticipants,
    resourceId,
    participants,
    loading,
    error,
    challengeId,
    goals,
    notSetGoals,
    fetchChallengeObjectives
  } = props;

  const [isParticipantsFeached, setIsParticipantsFetched] = useState(false);

  useEffect(() => {
    if (!isParticipantsFeached) {
      setIsParticipantsFetched(true);
      fetchParticipants(resourceId);
    }
    participants.length !== 0 &&
      fetchChallengeObjectives(participants, challengeId);
  }, [
    challengeId,
    fetchChallengeObjectives,
    fetchParticipants,
    isParticipantsFeached,
    participants,
    resourceId
  ]);

  return (
    <React.Fragment>
      <Content padder>
        {error && <Error error={error} />}
        {loading ? <Progress /> : null}
        {!loading && goals && notSetGoals && (
          <React.Fragment>
            <Title text="仲間たちのチャレンジ目標" />
            <React.Fragment>
              {!loading &&
                !!goals &&
                goals.map((goal: any) => (
                  <ChallengeGoalCard
                    key={goal.id}
                    goal={goal}
                    challengeId={challengeId}
                  />
                ))}
            </React.Fragment>
            <Text />
            <Text>目標をまだ設定していないユーザ</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 5,
                padding: 5
              }}
            >
              {!loading &&
                !!notSetGoals &&
                notSetGoals.map((user: any) => {
                  return (
                    <UserAvatar
                      key={user.id}
                      photoURL={user.photoURL}
                      userId={user.id}
                      to={getChallengeUserGoalPath(challengeId, user.id)}
                    />
                  );
                })}
            </View>
          </React.Fragment>
        )}
      </Content>
    </React.Fragment>
  );
};

export default ChallengeGoals;
