import React, { useState } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import theme from 'lib/theme';
import AuthModal from 'web/components/atoms/AuthModal';

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
        onClick={() => openModal('ログイン')}
      >
        ログイン
      </StyledButton>
      <AuthModal open={visibleModal} onClose={closeModal} title={title} />
    </React.Fragment>
  );
};

export default AuthButton;
