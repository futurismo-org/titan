import * as React from 'react';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components';
import theme from '../../lib/theme';
import AuthContainer from '../../containers/authContainer';

const StyledToolbar = styled(Toolbar)`
  && {
    border-bottom: 1px solid ${theme.palette.divider};
    background-color: ${theme.palette.primary.main};
    color: white;
  }
` as React.ComponentType<ToolbarProps>;

const StyledTypography = styled(Typography)`
  && {
    flex: 1;
    font-weight: bold;
  }
` as React.ComponentType<TypographyProps>;

const TopToolbar = () => (
  <StyledToolbar>
    <StyledTypography component="h2" variant="h5" noWrap>
      Titan
    </StyledTypography>
    <AuthContainer />
  </StyledToolbar>
);

export default TopToolbar;
