import React, { useEffect } from 'react';
import StackGrid from 'react-stack-grid';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';
import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';

const ChallengeGoals = (props: any) => {
  const { fetchParticipants, resourceId, users, loading, error } = props;

  useEffect(() => {
    fetchParticipants(resourceId);
  });

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && users && (
        <StackGrid columnWidth={150}>
          {users.map((user: any) => (
            <React.Fragment key={user.id}>
              <ChallengeGoalCard />
            </React.Fragment>
          ))}
        </StackGrid>
      )}
    </React.Fragment>
  );
};

export default ChallengeGoals;
