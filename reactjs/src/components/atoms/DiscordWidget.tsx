import * as React from 'react';
import styled from 'styled-components';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

import theme from '../../lib/theme';

const StyledPaper = styled(Paper)`
  && {
    margin: ${theme.spacing(0)}px;
    padding: ${theme.spacing(3)}px;
  }
` as React.ComponentType<PaperProps>;

const StyledTitle = styled(Typography)`
  && {
    margin-bottom: ${theme.spacing(3)}px;
  }
` as React.ComponentType<TypographyProps>;

const DiscordWidget = () => (
  <StyledPaper>
    <StyledTitle component="h3" variant="h4">
      オンラインチャット
    </StyledTitle>
    <iframe
      title="discord-widget"
      src="https://discordapp.com/widget?id=587935450463993866&theme=light"
      width="100%"
      height="300"
      allowTransparency
      frameBorder="0"
    />
  </StyledPaper>
);

export default DiscordWidget;
