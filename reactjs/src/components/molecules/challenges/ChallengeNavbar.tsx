import * as React from 'react';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Link, { LinkProps } from '@material-ui/core/Link';
import theme from '../../../lib/theme';

const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: start;
    overflow-x: auto;
  }
` as React.ComponentType<ToolbarProps>;

type StyledLinkProps = LinkProps & {
  component: any;
  noWrap: any;
  color: string;
  variant: string;
  to: string;
};

const StyledLink = styled(Link)`
  && {
    padding-right: ${theme.spacing(3)}px;
    flex-shrink: 0;
  }
` as React.ComponentType<StyledLinkProps>;

const NoStyledRouterLink = styled(RouterLink)`
  && {
    text-decoration: none;
    color: inherit;
  }
`;

interface NavLinkProps {
  to: string;
  text: string;
}

const NavLink = (props: NavLinkProps) => (
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

const ChallengeNavbar = (props: any) => (
  <StyledToolbar component="nav" variant="dense">
    <NavLink to={`/challenges/${props.id}/overview`} text="概要" />
    <NavLink to={`/challenges/${props.id}/discussion`} text="掲示板" />
    <NavLink to={`/challenges/${props.id}/leaderboard`} text="リーダーボード" />
    <NavLink to={`/challenges/${props.id}/rules`} text="ルール" />
  </StyledToolbar>
);

export default ChallengeNavbar;
