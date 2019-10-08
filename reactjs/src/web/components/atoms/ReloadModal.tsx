import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  DialogTitle
} from '@material-ui/core';

const ReloadModal = (props: any) => {
  const [show, setShow] = useState(false);

  /* eslint-disable no-undef */
  useEffect(() => {
    window.addEventListener('newContentAvailable', () => {
      setShow(true);
    });
  }, []);

  const handleClose = () => {
    window.location.reload();
  };
  /* eslint-enable no-undef */

  return (
    <Dialog
      open={show}
      onClose={() => setShow(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        新しいバージョンがあります
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          画面を更新してインストールしてください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          更新
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReloadModal;
