import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import AuthModal from './AuthModal';

import theme from '../../lib/theme';

const StyledContainer = styled.div`
  && {
    margin: ${theme.spacing(1)}px;
  }
`;

const AuthButton = (props: any) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState('');

  const openModal = (modalTitle: string) => {
    setVisibleModal(true);
    setTitle(modalTitle);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setTitle('');
  };

  const { classes } = props;

  return (
    <StyledContainer>
      <Button
        color="inherit"
        className={classes.button}
        onClick={() => openModal('登録')}
      >
        登録
      </Button>
      <Button
        color="inherit"
        className={classes.button}
        onClick={() => openModal('ログイン')}
      >
        ログイン
      </Button>
      <AuthModal open={visibleModal} onClose={closeModal} title={title} />
    </StyledContainer>
  );
};

export default AuthButton;
