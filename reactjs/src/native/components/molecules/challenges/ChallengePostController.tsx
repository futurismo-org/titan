import React, { useState } from 'react';
import { Button, Text } from 'native-base';
import AlertPro from 'react-native-alert-pro';
import { withRouter } from 'react-router-native';
import { useDocument } from 'react-firebase-hooks/firestore';

import Modal from 'react-native-modal';
import Error from '../../atoms/Error';
import { successToastWithNoRedirect } from '../../atoms/Toast';
import { isPostPossible } from '~/lib/challenge';

import ChallengePostRecordModalTimeForm from './ChallengePostRecordModalTimeForm';
import { RECORD_OPTION_TIME } from '~/constants/strategy';

const ChallengePostController = (props: any) => {
  const {
    history,
    recordHandler,
    resetHandler,
    hide,
    participantsRef,
    showGiphy,
    recordStrategy,
    recordOption
  } = props;

  const [alert, setAlert] = useState();

  const [value, loading, error] = useDocument(participantsRef);

  const writeRecord = recordHandler(
    successToastWithNoRedirect,
    history.push,
    () => showGiphy('win')
  );

  const resetRecord =
    !!resetHandler && resetHandler(history.push, () => showGiphy('lose'));

  const data = value && value.data();
  const recordDisabled = !isPostPossible(
    data && data.histories,
    recordStrategy
  );

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const ChallengePostRecordModalForm = (props: any) => {
    const { option } = props;

    let component = null;

    if (option === RECORD_OPTION_TIME) {
      component = (
        <ChallengePostRecordModalTimeForm
          closeHandler={closeModal}
          postHandler={writeRecord}
          data={data}
        />
      );
    }

    return component;
  };

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
                onPress={openModal}
              >
                <Text>記録する</Text>
              </Button>
              <Modal isVisible={modal} avoidKeyboard>
                <ChallengePostRecordModalForm option={recordOption} />
              </Modal>
              {!!resetHandler && (
                <Button
                  warning
                  style={{ margin: 2 }}
                  onPress={() => alert.open()}
                >
                  <Text>リセット</Text>
                </Button>
              )}
            </React.Fragment>
          )}
    </React.Fragment>
  );
};

export default withRouter(ChallengePostController);
