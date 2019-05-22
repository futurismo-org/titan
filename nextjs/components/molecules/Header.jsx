import React from "react";
import { Link } from "../../routes";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link route="home">
      <a style={linkStyle}>ホーム</a>
    </Link>
    <Link route="signin">
      <a style={linkStyle}>サインイン</a>
    </Link>
    <Link route="challenges">
      <a style={linkStyle}>チャレンジ</a>
    </Link>
  </div>
);

export default Header;
