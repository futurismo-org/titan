import * as React from 'react';
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
  constructor(props) {
    super(props);

    this.state = { visibleModal: false, title: '' };
  }

  openModal = modalTitle => {
    this.setState({ visibleModal: true, title: modalTitle });
  };

  closeModal = () => {
    this.setState({ visibleModal: false, modalTitle: '' });
  };

  render() {
    const { classes } = this.props;

    return (
      <StyledContainer>
        <Button
          color="inherit"
          className={classes.button}
          onClick={() => this.openModal('登録')}
        >
          登録
        </Button>
        <Button
          color="inherit"
          className={classes.button}
          onClick={() => this.openModal('ログイン')}
        >
          ログイン
        </Button>
        <AuthModal
          open={this.state.visibleModal}
          onClose={this.closeModal}
          title={this.state.title}
        />
      </StyledContainer>
    );
  }
}

export default AuthButton;
