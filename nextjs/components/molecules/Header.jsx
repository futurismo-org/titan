import React from "react";
import Link from "next/link";

const linkStyle = {
  marginRight: 15
};

const Header = () => (
  <div>
    <Link href="/">
      <a style={linkStyle}>ホーム</a>
    </Link>
    <Link href="/sample">
      <a style={linkStyle}>サンプル</a>
    </Link>
  </div>
);

export default Header;
