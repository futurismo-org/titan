import React from "react";
import firebase from "firebase";
import config from "../lib/config";

export default class LoginPage extends React.Component {
  componentDidMount() {
    firebase.initializeApp(config);

    const firebaseui = require("firebaseui");
    require("firebaseui/dist/firebaseui.css");

    const ui =
      firebaseui.auth.AuthUI.getInstance() ||
      new firebaseui.auth.AuthUI(firebase.auth());

    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult, redirectUrl) => {
          return true;
        },
        uiShown: () => {
          document.getElementById("loader").style.display = "none"; // eslint-disable-line no-undef
        }
      },
      signInFlow: "popup",
      signInSuccessUrl: "mypage",
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      ],
      tosUrl: "terms",
      privacyPolicyUrl: "policy"
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  }

  render() {
    return (
      <div>
        <div id="firebaseui-auth-container" />
        <div id="loader">Now Loading...</div>
      </div>
    );
  }
}
