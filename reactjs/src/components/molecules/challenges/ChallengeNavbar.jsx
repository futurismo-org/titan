import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import theme from '../../../lib/theme';

const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: start;
    overflow-x: auto;
  }
`;

const StyledLink = styled(Link)`
  && {
    padding-right: ${theme.spacing(3)}px;
    flex-shrink: 0;
  }
`;

const NoStyledRouterLink = styled(RouterLink)`
  && {
    text-decoration: none;
    color: inherit;
  }
`;

const NavLink = props => (
  <StyledLink
    component={NoStyledRouterLink}
    noWrap
    color="inherit"
    variant="body2"
    to={props.to}
  >
    {props.text}
  </StyledLink>
);

const ChallengeHeader = props => (
  <StyledToolbar component="nav" variant="dense">
    <NavLink to={`/challenges/${props.id}/overview`} text="概要" />
    <NavLink to={`/challenges/${props.id}/discussion`} text="掲示板" />
    <NavLink to={`/challenges/${props.id}/leaderboard`} text="リーダーボード" />
    <NavLink to={`/challenges/${props.id}/rules`} text="ルール" />
  </StyledToolbar>
);

export default ChallengeHeader;
