import React, { useEffect } from 'react';
import { Text, Content, View } from 'native-base';
import Title from '../../atoms/Title';

import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import UserAvatar from '../../atoms/UserAvatar';
import { getChallengeUserGoalPath } from '~/lib/url';
import ViewRow from '../../atoms/ViewRow';

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

  useEffect(() => {
    participants.length === 0 && fetchParticipants(resourceId);
    participants.length !== 0 &&
      !goals &&
      fetchChallengeObjectives(participants, challengeId);
  }, [
    challengeId,
    fetchChallengeObjectives,
    fetchParticipants,
    goals,
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
