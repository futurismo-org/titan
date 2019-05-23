import React from "react";
import { Link } from "react-router-dom";
import TopToolbar from "./TopToolbar";
import NavToolbar from "./NavToolbar";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <React.Fragment>
    <TopToolbar />
    <NavToolbar />
  </React.Fragment>
);

export default Header;
