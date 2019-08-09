import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const BlockButton = (props: any) => {
  const { user, updateHandler } = props;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateHandler()
      .then(() => window.alert('設定が完了しました。')) // eslint-disable-line
      .then(() => setOpen(false));
  };

  return (
    <React.Fragment>
      <div role="button" onClick={handleOpen}>
        <p style={{ textDecoration: 'underline' }}>ブロック</p>
      </div>
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {user.displayName}さんをブロックしますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ブロックすると、そのユーザはあなたの投稿がみれなくなります。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="contained" color="secondary">
            いいえ
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            color="primary"
            autoFocus
          >
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default BlockButton;
