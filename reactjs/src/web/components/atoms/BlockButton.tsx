import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { brandGray } from '~/lib/theme';

const BlockButton = (props: any) => {
  const { user, updateHandler, removeHandler, isExistLazy } = props;
  const [open, setOpen] = useState(false);
  const [block, setBlock] = useState(false);

  useEffect(() => {
    let mounted = true;

    const getIsExist = async (handler: any) => {
      const exist = await handler();

      if (mounted) {
        setBlock(exist);
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
    updateHandler()
      .then(() => window.alert('ブロックが完了しました。')) // eslint-disable-line
      .then(() => window.location.reload()); // eslint-disable-line
  };

  const handleRemove = () => {
    removeHandler()
      .then(
        () => window.alert('ブロックを解除しました。') // eslint-disable-line
      )
      .then(() => window.location.reload()); // eslint-disable-line
  };

  return (
    <React.Fragment>
      {block ? (
        <div role="button" onClick={handleRemove}>
          <p
            style={{
              color: brandGray,
              textDecoration: 'underline',
              marginLeft: 10
            }}
          >
            ブロック解除
          </p>
        </div>
      ) : (
        <div role="button" onClick={handleOpen}>
          <p
            style={{
              color: brandGray,
              textDecoration: 'underline',
              marginLeft: 10
            }}
          >
            ブロック
          </p>
        </div>
      )}
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
