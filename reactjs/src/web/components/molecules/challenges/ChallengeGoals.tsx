import React from 'react';
import StackGrid from 'react-stack-grid';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';

const ChallengeGoals = (props: any) => {
  return (
    <React.Fragment>
      <StackGrid columnWidth={200}>
        <ChallengeGoalCard key={1} />
        <ChallengeGoalCard key={2} />
        <ChallengeGoalCard key={3} />
        <ChallengeGoalCard key={4} />
        <ChallengeGoalCard key={5} />
        <ChallengeGoalCard key={6} />
        <ChallengeGoalCard key={7} />
        <ChallengeGoalCard key={8} />
        <ChallengeGoalCard key={9} />
        <ChallengeGoalCard key={10} />
        <ChallengeGoalCard key={11} />
        <ChallengeGoalCard key={12} />
      </StackGrid>
    </React.Fragment>
  );
};

export default ChallengeGoals;
