import * as React from 'react';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import Button, { ButtonProps } from '@material-ui/core/Button';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
// import IconButton from "@material-ui/core/IconButton";
// import SearchIcon from "@material-ui/icons/Search";
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../lib/theme';

const StyledToolbar = styled(Toolbar)`
  && {
    border-bottom: 1px solid ${theme.palette.divider}px;
  }
` as React.ComponentType<ToolbarProps>;

const StyledTypography = styled(Typography)`
  && {
    flex: 1;
  }
` as React.ComponentType<TypographyProps>;

const NoStyledLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
  }
`;

const TopToolbar = () => (
  <StyledToolbar>
    <StyledTypography component="h2" variant="h5" color="inherit" noWrap>
      Titan
    </StyledTypography>
    {/* <IconButton>
      <SearchIcon />
    </IconButton> */}
    <Button variant="outlined" size="small">
      <NoStyledLink to="/signin">Sign in</NoStyledLink>
    </Button>
  </StyledToolbar>
);

export default TopToolbar;
