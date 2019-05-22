import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link to="/" style={linkStyle}>
      ホーム
    </Link>
    <Link to="/challenges" style={linkStyle}>
      チャレンジ
    </Link>
    <Link to="/signin" style={linkStyle}>
      サインイン
    </Link>
    <Link to="/playground" style={linkStyle}>
      実験
    </Link>
  </div>
);

export default Header;
