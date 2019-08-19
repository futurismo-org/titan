import React from 'react';
import StackGrid from 'react-stack-grid';

const ChallengeGoals = (props: any) => {
  return (
    <React.Fragment>
      <StackGrid columnWidth={150}>
        <div key="key1">Item 1</div>
        <div key="key2">Item 2</div>
        <div key="key3">Item 3</div>
      </StackGrid>
    </React.Fragment>
  );
};

export default ChallengeGoals;
