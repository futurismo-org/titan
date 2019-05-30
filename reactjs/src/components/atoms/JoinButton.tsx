import * as React from 'react';
import Button from '@material-ui/core/Button';

const JoinButton = (props: any) => {
  const joined = false;

  const renderJoinButton = () => (
    <Button color="inherit" variant="outlined" size="small">
      参加する
    </Button>
  );

  const renderLeaveButton = () => (
    <Button color="inherit" variant="outlined" size="small">
      参加をやめる
    </Button>
  );

  return joined ? renderLeaveButton() : renderJoinButton();
};

export default JoinButton;
