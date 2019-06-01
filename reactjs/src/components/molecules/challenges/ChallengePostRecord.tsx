import * as React from 'react';
import styled from 'styled-components';
import Card, { CardProps } from '@material-ui/core/Card';
import { CardContent } from '@material-ui/core';

const StyledDays = styled.span`
  @media screen and (min-width: 768px) {
    font-size: 12vw;
  }
  font-size: 25vw;
`;

const StyledDaysText = styled.span`
  @media screen and (min-width: 768px) {
    font-size: 6vw;
  }
  font-size: 10vw;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  border-radius: 3;
  border: 0;
  color: white;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
` as React.ComponentType<CardProps>;

const RecordBoard = (props: any) => (
  <StyledCard>
    <CardContent>
      <div>
        <StyledDays>{props.days}</StyledDays>
        <StyledDaysText>days</StyledDaysText>
      </div>
      <StyledDaysText>達成しました！</StyledDaysText>
    </CardContent>
  </StyledCard>
);

export default RecordBoard;
