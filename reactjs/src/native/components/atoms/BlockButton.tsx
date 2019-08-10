import React, { useState, useEffect } from 'react';

import { withRouter } from 'react-router-native';
import AlertPro from 'react-native-alert-pro';
import { successToastWithNoRedirect } from './Toast';
import TouchableText from './TouchableText';

const MuteButton = (props: any) => {
  const { user, updateHandler, removeHandler, isExistLazy, location } = props;

  const [alert, setAlert] = useState();
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
    alert.open();
  };

  const handleClose = () => {
    alert.close();
  };

  const handleUpdate = () => {
    updateHandler()
      .then(() => successToastWithNoRedirect('ブロックが完了しました。'))
      .then(() => alert.close())
      .then(() => {
        location.href = location.pathname;
      });
  };

  const handleRemove = () => {
    removeHandler()
      .then(() => successToastWithNoRedirect('ブロックを解除しました。'))
      .then(() => {
        location.href = location.pathname;
      });
  };

  return (
    <React.Fragment>
      {block ? (
        <TouchableText text="ブロック解除" handler={handleRemove} underline />
      ) : (
        <TouchableText text="ブロック" handler={handleOpen} underline />
      )}
      <AlertPro
        ref={(ref: any) => setAlert(ref)}
        onConfirm={handleUpdate}
        onCancel={handleClose}
        title={`${user.displayName}さんをブロックしますか？`}
        message="ブロックすると、そのユーザはあなたの投稿がみれなくなります。"
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
