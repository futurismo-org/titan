import * as React from 'react';
import Toolbar, { ToolbarProps } from '@material-ui/core/Toolbar';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import Link, { LinkProps } from '@material-ui/core/Link';
import theme from '../../lib/theme';

const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: space-between;
    overflow-x: auto;
  }
` as React.ComponentType<ToolbarProps>;

type StyledLinkProps = LinkProps & {
  color: string;
  to: string;
  noWrap: any;
  variant: string;
  component: any;
};

const StyledLink = styled(Link)`
  && {
    padding: ${theme.spacing(1)}px;
    flex-shrink: 0;
  }
` as React.ComponentType<StyledLinkProps>;

const NoStyledRouterLink = styled(RouterLink)`
  && {
    text-decoration: none;
    color: inherit;
  }
`;

interface Props {
  text: string;
  to: string;
}

const NavLink = (props: Props) => (
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

const NavToolbar = () => (
  <StyledToolbar component="nav" variant="dense">
    <NavLink to="/" text="ホーム" />
    <NavLink to="/challenges" text="チャレンジ" />
    <NavLink to="/categories" text="カテゴリ" />
    <NavLink to="/ranking" text="ランキング" />
    <NavLink to="/topics" text="トピック" />
  </StyledToolbar>
);

export default NavToolbar;
