import React from 'react';
import styled from 'styled-components';

import ChallengeObjective from './ChallengeObjective';
import ChallengeLog from './ChallengeLog';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ChallengeJournal = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Wrapper>
        <ChallengeObjective challenge={challenge} />
        <ChallengeLog challenge={challenge} />
      </Wrapper>
    </React.Fragment>
  );
};

export default ChallengeJournal;
