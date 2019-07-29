import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import {
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
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
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          新しいバージョンがみつかりました。更新してインストールしてください。
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          インストール
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReloadModal;
