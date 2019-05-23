import React from "react";
import { Link } from "react-router-dom";
import TopToolbar from "./TopToolbar";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <React.Fragment>
    <TopToolbar />
    <Link to="/" style={linkStyle}>
      ホーム
    </Link>
    <Link to="/challenges" style={linkStyle}>
      チャレンジ
    </Link>
    <Link to="/categories" style={linkStyle}>
      カテゴリ
    </Link>
    <Link to="/ranking" style={linkStyle}>
      ランキング
    </Link>
    <Link to="/topics" style={linkStyle}>
      トピック
    </Link>
  </React.Fragment>
);

export default Header;
