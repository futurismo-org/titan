import React from 'react';
import { withRouter } from 'react-router-dom';
import { Fab } from '@material-ui/core';

const PrimaryFab = (props: any) => {
  const { text, path, history } = props;

  return (
    <Fab
      variant="extended"
      color="primary"
      style={{ fontWeight: 'bold' }}
      onClick={() => path && history.push(path)}
    >
      {text}
    </Fab>
  );
};

export default withRouter(PrimaryFab);
