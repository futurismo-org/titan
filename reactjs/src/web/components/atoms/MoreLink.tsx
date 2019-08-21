import React from 'react';

import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const MoreLink = (props: any) => {
  const { to, text } = props;

  return (
    <Link
      to={to}
      style={{
        textDecoration: 'none',
        color: 'inherit',
        textAlign: 'right'
      }}
    >
      <Typography variant="subtitle1" color="primary">
        {text || 'もっと見る'}
      </Typography>
    </Link>
  );
};

export default MoreLink;
