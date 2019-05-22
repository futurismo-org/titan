import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link to="/">
      <a style={linkStyle}>ホーム</a>
    </Link>
    <Link to="/challenges">
      <a style={linkStyle}>チャレンジ</a>
    </Link>
    <Link to="/singin">
      <a style={linkStyle}>サインイン</a>
    </Link>
    <Link to="/playground">
      <a style={linkStyle}>実験</a>
    </Link>
  </div>
);

export default Header;
