import React, { useEffect } from 'react';
import StackGrid from 'react-stack-grid';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';

const ChallengeGoals = (props: any) => {
  const { fetchParticipants, resourceId, users, loading, error } = props;

  useEffect(() => {
    users === [] && fetchParticipants(resourceId);
  }, [fetchParticipants, resourceId, users]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      <StackGrid>
        {users.map((user: any) => (
          <ChallengeGoalCard user={user} key={user.id} />
        ))}
      </StackGrid>
    </React.Fragment>
  );
};

export default ChallengeGoals;
