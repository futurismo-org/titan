import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';

const PrimaryButton = (props: any) => {
  const { text, path, history } = props;

  return (
    <Button
      variant="contained"
      color="primary"
      style={{ fontWeight: 'bold' }}
      onClick={() => path && history.push(path)}
    >
      {text}
    </Button>
  );
};

export default withRouter(PrimaryButton);
