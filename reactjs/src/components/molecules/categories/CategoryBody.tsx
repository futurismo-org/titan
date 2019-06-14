import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import theme from '../../../lib/theme';

const CategoryContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const Title = (props: any) => (
  <Typography component="h3" variant="h4">
    {props.text}
  </Typography>
);

const StyledPaper = styled(Paper)`
  && {
    margin: ${theme.spacing(0)}px;
    padding: ${theme.spacing(3)}px;
  }
` as React.ComponentType<PaperProps>;

const CategoryBody = (props: any) => {
  return (
    <CategoryContent>
      <StyledPaper>
        <Title text="概要" />
      </StyledPaper>
      <StyledPaper>
        <Title text="チャレンジ一覧" />
      </StyledPaper>
      <StyledPaper>
        <Title text="Discordフリートーク" />
      </StyledPaper>
    </CategoryContent>
  );
};

export default CategoryBody;
