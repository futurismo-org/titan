import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-native';
import AlertPro from 'react-native-alert-pro';
import { successToastWithNoRedirect } from './Toast';
import TouchableText from './TouchableText';

const MuteButton = (props: any) => {
  const {
    user,
    updateHandler,
    removeHandler,
    isExistLazy,
    history,
    location
  } = props;

  const [alert, setAlert] = useState();
  const [mute, setMute] = useState(false);

  useEffect(() => {
    isExistLazy().then((exist: boolean) => setMute(exist));
  }, [isExistLazy]);

  const handleOpen = () => {
    alert.open();
  };

  const handleClose = () => {
    alert.close();
  };

  const handleUpdate = () => {
    updateHandler()
      .then(() => successToastWithNoRedirect('ミュートが完了しました。'))
      .then(() => alert.close())
      .then(() => {
        const path = location.pathname;
        history.push('/');
        history.push(path);
      });
  };

  const handleRemove = () => {
    removeHandler()
      .then(() => successToastWithNoRedirect('ミュートを解除しました。'))
      .then(() => {
        const path = location.pathname;
        history.push('/');
        history.push(path);
      });
  };

  return (
    <React.Fragment>
      {mute ? (
        <TouchableText text="ミュート解除" handler={handleRemove} underline />
      ) : (
        <TouchableText text="ミュート" handler={handleOpen} underline />
      )}
      <AlertPro
        ref={(ref: any) => setAlert(ref)}
        onConfirm={handleUpdate}
        onCancel={handleClose}
        title={`${user.displayName}さんをミュートしますか？`}
        message="ミュートすると、そのユーザの投稿は表示されなくなります。"
        textCancel="いいえ"
        textConfirm="はい"
        customStyles={{
          message: { lineHeight: 15 }
        }}
      />
    </React.Fragment>
  );
};

export default withRouter(MuteButton);
