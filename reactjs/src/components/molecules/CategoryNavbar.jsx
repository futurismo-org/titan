import React from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  marginRight: 15
};

const CategoryHeader = props => (
  <div>
    <Link to={`/categories/${props.id}/overview`} style={linkStyle}>
      概要
    </Link>
    <Link to={`/categories/${props.id}/discussion`} style={linkStyle}>
      掲示板
    </Link>
    <Link to={`/categories/${props.id}/leaderboard`} style={linkStyle}>
      リーダーボード
    </Link>
    <Link to={`/categories/${props.id}/rules`} style={linkStyle}>
      ルール
    </Link>
  </div>
);

export default CategoryHeader;
