import React, { useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import { MailOutline, VpnKey } from '@material-ui/icons';
import firebase from 'firebase/app';
import 'firebase/auth';

import styled from 'styled-components';
import Button, { ButtonProps } from '@material-ui/core/Button';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';
import theme from '../../lib/theme';

const StyledSubmitButton = styled(Button)`
  text-align: center;
  margin: ${theme.spacing(1)}px;
` as React.ComponentType<ButtonProps>;

const StyledItemContainer = styled(FormControl)`
  text-align: center;
` as React.ComponentType<FormControlProps>;

const StyledTextField = styled(TextField)`
  margin: ${theme.spacing(1)}px;
` as React.ComponentType<TextFieldProps>;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      window.location.href = '/'; // eslint-disable-line no-undef
    } catch (err) {
      switch (err.code) {
        case 'auth/email-already-in-use':
          console.log(err);
          console.log(err.message);
          break;
        case 'auth/invalid-email':
          console.log(err);
          console.log(err.message);
          break;
        case 'auth/operation-not-allowed':
          console.log(err);
          console.log(err.message);
          break;
        case 'auth/weak-password':
          console.log(err);
          console.log(err.message);
          break;
        default:
          console.log(err);
      }
    }
  };

  return (
    <StyledItemContainer>
      <StyledTextField
        id="input-email-with-icon"
        label="メールアドレス"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutline />
            </InputAdornment>
          )
        }}
        onChange={handleEmailChange}
      />
      <StyledTextField
        id="input-password-with-icon"
        label="パスワード"
        type="password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <VpnKey />
            </InputAdornment>
          )
        }}
        onChange={handlePasswordChange}
      />
      <StyledSubmitButton
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => loginWithEmailAndPassword(email, password)}
      >
        登録する
      </StyledSubmitButton>
    </StyledItemContainer>
  );
};

export default LoginForm;
