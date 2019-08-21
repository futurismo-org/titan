import React from 'react';
import styled from 'styled-components';

import ChallengeObjective from './ChallengeObjective';
import ChallengeLog from './ChallengeLog';

const Wrapper = styled.div`
  margin-top: 20px;
`;

const ChallengeNote = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Wrapper>
        <div style={{ textAlign: 'center' }}>
          <h1>Titanさんの努力ノート</h1>
        </div>
        <ChallengeObjective challenge={challenge} />
        <ChallengeLog challenge={challenge} />
      </Wrapper>
    </React.Fragment>
  );
};

export default ChallengeNote;
