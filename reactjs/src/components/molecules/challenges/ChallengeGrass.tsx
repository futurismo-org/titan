import * as React from 'react';
import styled from 'styled-components';

import theme from '../../../lib/theme';

const SquareWrapper = styled.div`
  position: relative;
  width: 240px;
  margin: 10px;
`;

const notAchievedColor = '#ffcdd2';
const achievedColor = '#ff5252';

const Square = styled.button`
  margin: 1px;
  width: 30px;
  height: 30px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 5px;
  background-color: ${props =>
    props.color === 'achieved' ? achievedColor : notAchievedColor};
`;

const ChallengeGrass = () => {
  return (
    <SquareWrapper>
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square color="achieved" />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
      <Square />
    </SquareWrapper>
  );
};

export default ChallengeGrass;
