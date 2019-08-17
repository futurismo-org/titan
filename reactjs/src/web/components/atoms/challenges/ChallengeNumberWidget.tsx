import * as React from 'react';

import { Paper, Typography, Tooltip } from '@material-ui/core';

import styled from 'styled-components';
import { PaperProps } from '@material-ui/core/Paper';
import theme from '~/lib/theme';

const WidgetWrapper = styled.div`
  display: flex;
  min-height: 100%;
  margin-top: 20px;
`;

const WidgetHeader = styled.div`
  padding: ${theme.spacing(2)}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const WidgetBody = styled.div`
  padding-right: ${theme.spacing(2)}px;
  padding-left: ${theme.spacing(2)}px;
`;

const StyledPaper = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    flex-grow: 1px;
    overflow: hidden;
    min-width: 150px;
  }
` as React.ComponentType<PaperProps>;

const StyledNumber = styled.span`
  @media screen and (min-width: 768px) {
    font-size: 64px;
  }
  font-size: 48px;
`;

const StyledUnit = styled.span`
  @media screen and (min-width: 768px) {
    font-size: 32px;
  }
  font-size: 24px;
`;

const NumberContainer = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1px;
  /* padding-bottom: ${theme.spacing(1)}px; */
`;

const NumberWidget = ({ title, number, unit, description, ...props }: any) => (
  <WidgetWrapper>
    <Tooltip title={description}>
      <StyledPaper>
        <WidgetHeader>
          <Typography color="textSecondary">{title}</Typography>
        </WidgetHeader>
        <WidgetBody>
          <NumberContainer>
            <StyledNumber>{number}</StyledNumber>
            <StyledUnit>{unit}</StyledUnit>
          </NumberContainer>
        </WidgetBody>
      </StyledPaper>
    </Tooltip>
  </WidgetWrapper>
);

export default NumberWidget;
