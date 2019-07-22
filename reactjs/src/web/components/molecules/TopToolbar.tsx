import * as React from 'react';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AuthContainer from 'containers/authContainer';
import theme from 'lib/theme';
import NavDrawer from './NavDrawer';

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

const NoStyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const TopToolbar = () => (
  <StyledToolbar>
    <NavDrawer />
    <StyledTypography component="h2" variant="h5" noWrap>
      <NoStyledLink to="/">Titan</NoStyledLink>
    </StyledTypography>
    <AuthContainer />
  </StyledToolbar>
);

export default TopToolbar;
