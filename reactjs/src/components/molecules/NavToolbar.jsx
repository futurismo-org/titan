import React from "react";
import Toolbar from "@material-ui/core/Toolbar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import MaterialLink from "@material-ui/core/Link";
import theme from "../../lib/theme";

const StyledToolbar = styled(Toolbar)`
  && {
    justify-content: space-between;
    overflow-x: auto;
  }
`;

const StyledLink = styled(MaterialLink)`
  && {
    padding: ${theme.spacing(1)}px;
    flex-shrink: 0;
  }
`;

const NoStyledRouterLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
  }
`;

const NavLink = props => (
  <StyledLink noWrap color="inherit" variant="body2">
    <NoStyledRouterLink to={props.to}>{props.text}</NoStyledRouterLink>
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
