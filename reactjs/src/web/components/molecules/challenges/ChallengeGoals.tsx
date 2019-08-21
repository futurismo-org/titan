import React, { useState, useEffect } from 'react';
import StackGrid from 'react-stack-grid';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import Title from '../../atoms/Title';

const ChallengeGoals = (props: any) => {
  const {
    fetchParticipants,
    resourceId,
    users,
    loading,
    error,
    challengeId,
    goals,
    fetchChallengeObjectives
  } = props;

  const [userReady, setUserReady] = useState(false);
  const [objectiveReady, setObjectiveReady] = useState(false);

  useEffect(() => {
    // !userReady && fetchParticipants(resourceId) && setUserReady(true);
    // userReady &&
    //   !objectiveReady &&
    //   users !== [] &&
    //   fetchChallengeObjectives(users, challengeId) &&
    //   setObjectiveReady(true);
  }, [
    challengeId,
    fetchChallengeObjectives,
    fetchParticipants,
    objectiveReady,
    resourceId,
    userReady,
    users
  ]);

  return (
    <React.Fragment>
      <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
        <Title text="仲間たちのチャレンジ目標" />
      </div>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && users && goals && (
        <StackGrid columnWidth={300}>
          {goals.map((goal: any) => (
            <ChallengeGoalCard
              goal={goal}
              key={goal.id}
              challengeId={challengeId}
            />
          ))}
        </StackGrid>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoals;
