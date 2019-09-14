import React, { useState } from 'react';
import { Text, Col, Button } from 'native-base';
import { withRouter } from 'react-router-native';
import { useDocument } from 'react-firebase-hooks/firestore';
import Modal from 'react-native-modal';
import { isPostPossible } from '~/lib/challenge';
import Error from '../atoms/Error';
import { RECORD_OPTION_TIME } from '~/constants/strategy';
import ChallengePostRecordModalTimeForm from './challenges/ChallengePostRecordModalTimeForm';

const QuickActionChallengeButton = (props: any) => {
  const {
    recordHandler,
    resetHandler,
    history,
    showGiphy,
    participantsRef,
    recordStrategy,
    recordOption
  } = props;

  const [value, loading, error] = useDocument(participantsRef);

  const writeRecord = recordHandler(null, history.push, () => showGiphy('win'));
  const resetRecord =
    !!resetHandler && resetHandler(history.push, () => showGiphy('lose'));

  const data = value && value.data();
  const recordDisabled =
    data && !isPostPossible(data.histories, recordStrategy);

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
      {error && <Error error={error} />}
      {!loading && data && (
        <React.Fragment>
          <Col>
            <Button full success onPress={openModal} disabled={recordDisabled}>
              <Text>記録する</Text>
            </Button>
            <Modal isVisible={modal} avoidKeyboard>
              <ChallengePostRecordModalForm option={recordOption} />
            </Modal>
          </Col>
          {!!resetHandler && (
            <Col>
              <Button full warning onPress={() => resetRecord(data)}>
                <Text>リセット</Text>
              </Button>
            </Col>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(QuickActionChallengeButton);
