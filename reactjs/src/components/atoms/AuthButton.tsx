import React, { useState } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import AuthModal from './AuthModal';

import theme from '../../lib/theme';

const StyledButton = styled(Button)`
  && {
    margin: ${theme.spacing(1)}px;
    font-weight: bold;
  }
` as React.ComponentType<ButtonProps>;

const AuthButton = (props: any) => {
  const [visibleModal, setVisibleModal] = useState(false);
  const [title, setTitle] = useState('');

  const openModal = (modalTitle: string) => {
    if (process.env.REACT_APP_ENV !== 'development') {
      window.alert('公開前なのでユーザ認証はできません。'); // eslint-disable-line 
      return;
    }

    setVisibleModal(true);
    setTitle(modalTitle);
  };

  const closeModal = () => {
    setVisibleModal(false);
    setTitle('');
  };

  return (
    <React.Fragment>
      <StyledButton
        color="inherit"
        variant="outlined"
        size="small"
        onClick={() => openModal('登録')}
      >
        登録
      </StyledButton>
      <StyledButton
        color="inherit"
        variant="outlined"
        size="small"
        onClick={() => openModal('ログイン')}
      >
        ログイン
      </StyledButton>
      <AuthModal open={visibleModal} onClose={closeModal} title={title} />
    </React.Fragment>
  );
};

export default AuthButton;
