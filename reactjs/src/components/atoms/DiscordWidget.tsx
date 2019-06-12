import React from 'react';
import styled from 'styled-components';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography, { TypographyProps } from '@material-ui/core/Typography';

import theme from '../../lib/theme';
import DiscordHistories from './DiscordHistories';

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

const DiscordWidget = () => {
  return (
    <StyledPaper>
      <StyledTitle component="h3" variant="h4">
        Discordチャット
      </StyledTitle>
      <iframe
        title="discord-widget"
        src="https://discordapp.com/widget?id=587935450463993866&theme=light"
        width="100%"
        height="300"
        frameBorder="0"
      />
      <DiscordHistories />
    </StyledPaper>
  );
};

export default DiscordWidget;
