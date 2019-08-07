import * as React from 'react';
import FlagIcon from '@material-ui/icons/Flag';
import { Modal, Grid } from '@material-ui/core';

import { carouselBlack as black } from '~/lib/theme';

const TopicReport = (props: any) => {
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
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: black,
            padding: 20
          }}
        >
          <h2 id="simple-modal-title">不適切なコンテンツを報告</h2>
          <p id="simple-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default TopicReport;
