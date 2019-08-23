import * as React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { Modal } from '@material-ui/core';

import styled from 'styled-components';
import { brandDark as black } from '~/lib/theme';

import FlagForm from '~/web/containers/FlagFormContainer';

const ModalContent = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${black};
  padding: 20px;
  @media screen and (min-width: 768px) {
    width: 500px;
  }
  width: 400px;
`;

const Flag = (props: any) => {
  const {
    isLogin,
    topic,
    challenge,
    category,
    profile,
    note,
    collectionType,
    collectionId
  } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: 'right' }}>
        <div onClick={handleOpen} role="button" className="flag-button">
          <FlagIcon fontSize="small" color="action" />
          <span>報告</span>
        </div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
          style={{
            color: '#fff'
          }}
        >
          <ModalContent>
            <h2 id="simple-modal-title">不適切なコンテンツの報告</h2>
            <div id="simple-modal-description">
              {isLogin ? (
                <FlagForm
                  topic={topic}
                  challenge={challenge}
                  category={category}
                  profile={profile}
                  note={note}
                  collectionType={collectionType}
                  collectionId={collectionId}
                  handleClose={handleClose}
                />
              ) : (
                <React.Fragment>報告にはログインが必要です。</React.Fragment>
              )}
            </div>
          </ModalContent>
        </Modal>
      </div>
    </React.Fragment>
  );
};

export default Flag;
