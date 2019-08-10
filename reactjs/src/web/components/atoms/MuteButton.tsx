import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const MuteButton = (props: any) => {
  const { user, updateHandler, removeHandler, isExistLazy } = props;
  const [open, setOpen] = useState(false);
  const [mute, setMute] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getIsExist = async (handler: any) => {
      const exist = await handler();

      if (mounted) {
        setMute(exist);
      }
    };

    getIsExist(isExistLazy);

    return () => {
      mounted = false;
    };
  }, [isExistLazy]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUpdate = () => {
    updateHandler().then(() => window.alert('ミュートが完了しました。')); // eslint-disable-line
  };

  const handleRemove = () => {
    removeHandler()
      .then(
        () => window.alert('ミュートを解除しました。') // eslint-disable-line
      )
      .then(() => window.location.reload()); // eslint-disable-line
  };

  return (
    <React.Fragment>
      {mute ? (
        <div role="button" onClick={handleRemove}>
          <p style={{ textDecoration: 'underline' }}>ミュート解除</p>
        </div>
      ) : (
        <div role="button" onClick={handleOpen}>
          <p style={{ textDecoration: 'underline' }}>ミュート</p>
        </div>
      )}
      <Dialog
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {user.displayName}さんをミュートしますか？
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            ミュートすると、そのユーザの投稿は表示されなくなります。
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

export default MuteButton;
