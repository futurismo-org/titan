import * as React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { Modal, Grid } from '@material-ui/core';

import styled from 'styled-components';
import { carouselBlack as black } from '~/lib/theme';

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
  width: 300px;
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
        <span>通報</span>
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
          <h2 id="simple-modal-title">不適切なコンテンツを通報</h2>
          <p id="simple-modal-description">
            {isLogin ? (
              <React.Fragment>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </React.Fragment>
            ) : (
              <React.Fragment>通報にはログインが必要です。</React.Fragment>
            )}
          </p>
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
};

export default TopicReport;
