import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import SignUpForm from './SignUpForm';
import LoginForm from './LoginForm';

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit
  },
  dialogTitle: {
    textAlign: 'center'
  },
  authBasicForm: {
    textAlign: 'center'
  }
});

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID
  ]
};

class AuthModal extends Component {
  state = {
    open: false
  };

  handleClose = () => {
    this.props.onClose();
  };

  render() {
    const { classes, onClose, title, ...other } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby="login-dialog-title"
        {...other}
      >
        <DialogTitle id="login-dialog-title" className={classes.dialogTitle}>
          {title}
        </DialogTitle>
        <DialogContent>
          <div className={classes.authBasicForm}>
            {title === '登録' ? <SignUpForm /> : <LoginForm />}
          </div>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AuthModal);
