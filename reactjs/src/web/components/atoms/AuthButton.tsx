import React, { useState } from 'react';
import Button, { ButtonProps } from '@material-ui/core/Button';
import styled from 'styled-components';
import Auth from '~/web/containers/AuthContainer';
import theme from '~/lib/theme';

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
      <Auth open={visibleModal} onClose={closeModal} title={title} />
    </React.Fragment>
  );
};

export default AuthButton;
