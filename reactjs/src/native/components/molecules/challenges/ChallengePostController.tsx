import React, { useState } from 'react';
import { Button, Text } from 'native-base';
import AlertPro from 'react-native-alert-pro';
import { withRouter } from 'react-router-native';
import { useDocument } from 'react-firebase-hooks/firestore';

import Error from '../../atoms/Error';
import { successToastWithNoRedirect } from '../../atoms/Toast';
import { isPostPossible } from '~/lib/challenge';

const ChallengePostController = (props: any) => {
  const {
    history,
    recordHandler,
    resetHandler,
    hide,
    participantsRef,
    showGiphy
  } = props;

  const [alert, setAlert] = useState();

  const [value, loading, error] = useDocument(participantsRef);

  const writeRecord = recordHandler(
    successToastWithNoRedirect,
    history.replace,
    () => showGiphy('win')
  );

  const resetRecord = resetHandler(history.replace, () => showGiphy('lose'));

  const data = value && value.data();
  const recordDisabled = !isPostPossible(data && data.histories);

  return (
    <React.Fragment>
      <AlertPro
        ref={(ref: any) => setAlert(ref)}
        onConfirm={() => {
          resetRecord(data);
          alert.close();
        }}
        onCancel={() => alert.close()}
        title="リセットの確認"
        message="本当に記録をリセットしますか？"
        textCancel="キャンセル"
        textConfirm="リセット"
        customStyles={{
          message: { lineHeight: 15 }
        }}
      />
      {error && <Error error={error} />}
      {loading && null}
      {hide
        ? null
        : data && (
            <React.Fragment>
              <Button
                style={{ margin: 2 }}
                success
                disabled={recordDisabled}
                onPress={() => writeRecord(data)}
              >
                <Text>記録する</Text>
              </Button>
              <Button
                warning
                style={{ margin: 2 }}
                onPress={() => alert.open()}
              >
                <Text>リセット</Text>
              </Button>
            </React.Fragment>
          )}
    </React.Fragment>
  );
};

export default withRouter(ChallengePostController);
