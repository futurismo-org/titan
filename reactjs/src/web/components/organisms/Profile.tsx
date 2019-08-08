import React, { useEffect } from 'react';

import { Follow } from 'react-twitter-widgets';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Error from '../atoms/Error';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import Paper from '../templates/PaperWrapper';
import UserAvatar from '../atoms/UserAvatar';

import { brandWhite } from '~/lib/theme';

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  background: ${brandWhite};
`;

const Profile = (props: any) => {
  const {
    fetchUserWithShortId,
    userShortId,
    user,
    error,
    loading,
    isMyProfile,
    isLogin
  } = props;

  useEffect(() => {
    fetchUserWithShortId(userShortId);
  }, [fetchUserWithShortId, userShortId]);

  const [openMute, setOpenMute] = React.useState(false);
  const [openBlock, setOpenBlock] = React.useState(false);

  const handleOpenBlock = () => {
    setOpenBlock(true);
  };

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };

  const handleOpenMute = () => {
    setOpenMute(true);
  };

  const handleCloseMute = () => {
    setOpenMute(false);
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && user && (
        <Paper>
          <Title text={`${user.displayName}さんのプロフィール`} />
          <UserAvatar photoURL={user.photoURL} userId={user.shortId} large />
          {!!user.twitterUsername && <Follow username={user.twitterUsername} />}
          <p>コンテンツ準備中...</p>
          {isLogin && !isMyProfile && (
            <React.Fragment>
              <div style={{ marginTop: 20, display: 'flex' }}>
                <div role="button" onClick={handleOpenMute}>
                  <p style={{ textDecoration: 'underline' }}>ミュート</p>
                </div>
                <div role="button" onClick={handleOpenBlock}>
                  <p style={{ textDecoration: 'underline', marginLeft: 10 }}>
                    ブロック
                  </p>
                </div>
              </div>
              <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openMute}
                onClose={handleCloseMute}
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
                  <Button
                    onClick={handleCloseMute}
                    variant="contained"
                    color="secondary"
                  >
                    いいえ
                  </Button>
                  <Button
                    onClick={handleCloseMute}
                    variant="contained"
                    color="primary"
                    autoFocus
                  >
                    はい
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={openBlock}
                onClose={handleCloseBlock}
              >
                <DialogTitle id="alert-dialog-title">
                  {user.displayName}さんをブロックしますか？
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    ブロックすると、そのユーザはあなたの投稿がみれなくなります。(現在開発中)
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleCloseBlock}
                    variant="contained"
                    color="secondary"
                  >
                    いいえ
                  </Button>
                  <Button
                    onClick={handleCloseBlock}
                    variant="contained"
                    color="primary"
                    autoFocus
                  >
                    はい
                  </Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          )}
        </Paper>
      )}
    </React.Fragment>
  );
};

export default Profile;
