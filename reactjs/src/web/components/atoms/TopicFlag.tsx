import * as React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { Modal } from '@material-ui/core';

import styled from 'styled-components';
import { carouselBlack as black } from '~/lib/theme';

import TopicFlagForm from './TopicFlagForm';

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

const TopicReport = (props: any) => {
  const { isLogin } = props;
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <div onClick={handleOpen} role="button" className="flag-button">
        <FlagIcon color="action" />
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
              <TopicFlagForm />
            ) : (
              <React.Fragment>報告にはログインが必要です。</React.Fragment>
            )}
          </div>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default TopicReport;
