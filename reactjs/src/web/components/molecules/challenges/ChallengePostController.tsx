import * as React from 'react';
import styled from 'styled-components';

import { useDocument } from 'react-firebase-hooks/firestore';
import { Button, Modal } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

import Error from '../../atoms/Error';
import {
  brandSuccess,
  brandWhite,
  brandWarning,
  brandGray,
  brandDark
} from '~/lib/theme';

import { isDaysValid, isPostPossible } from '~/lib/challenge';
import { RECORD_OPTION_NONE, RECORD_OPTION_TIME } from '~/constants/strategy';
import ChallengePostRecordModalTimeForm from './ChallengePostRecordModalTimeForm';

const StyledCenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${brandWhite};
  padding: 20px;
  @media screen and (min-width: 768px) {
    width: 500px;
  }
  width: 350px;
`;

const ChallengePostController = (props: any) => {
  const {
    history,
    recordHandler,
    resetHandler,
    hide,
    participantsRef,
    recordStrategy,
    recordOption
  } = props;

  const [value, loading, error] = useDocument(participantsRef);

  const data = value && value.data();

  const recordDisabled = !isPostPossible(
    data && data.histories,
    recordStrategy
  );

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const writeRecord = recordHandler(
    window.alert, // eslint-disable-line
    history.push,
    null,
    handleClose
  );

  const onPressRecordButton = (data: any) => {
    if (recordOption === RECORD_OPTION_NONE) {
      writeRecord(data);
    } else {
      handleOpen();
    }
  };

  const resetRecord = !!resetHandler && resetHandler(history.push);

  const confirm = (props: any) => {
    const { days } = props;
    if (!isDaysValid(days)) return;

    /* eslint-disable */
    if (window.confirm('本当にリセットしますか？')) {
      resetRecord(props);
    }
    /* eslint-enable */
  };

  const ChallengePostRecordModalForm = (props: any) => {
    const { option } = props;

    let component = null;

    if (option === RECORD_OPTION_TIME) {
      component = (
        <ChallengePostRecordModalTimeForm
          closeHandler={handleClose}
          postHandler={writeRecord}
          data={data}
        />
      );
    }

    return component;
  };

  return (
    <StyledCenterContainer>
      {error && <Error error={error} />}
      {loading && null}
      {hide
        ? null
        : data && (
            <React.Fragment>
              <div style={{ float: 'left' }}>
                <Button
                  variant="contained"
                  onClick={() => onPressRecordButton(data)}
                  style={{
                    backgroundColor: recordDisabled ? brandGray : brandSuccess,
                    color: brandWhite,
                    marginLeft: 5,
                    fontWeight: 'bold'
                  }}
                  disabled={recordDisabled}
                >
                  記録する
                </Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={open}
                  onClose={handleClose}
                  style={{
                    color: brandDark
                  }}
                >
                  <ModalContent>
                    <ChallengePostRecordModalForm option={recordOption} />
                  </ModalContent>
                </Modal>
                {!!resetHandler && (
                  <Button
                    variant="contained"
                    onClick={() => confirm(data)}
                    style={{
                      backgroundColor: brandWarning,
                      color: brandWhite,
                      marginLeft: 5,
                      fontWeight: 'bold'
                    }}
                  >
                    リセット
                  </Button>
                )}
              </div>
            </React.Fragment>
          )}
    </StyledCenterContainer>
  );
};

export default withRouter(ChallengePostController);
