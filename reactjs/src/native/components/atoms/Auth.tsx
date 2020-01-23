import React, { useState, useEffect } from 'react';
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  View
} from 'native-base';
import { withRouter } from 'react-router-native';
// import { AuthSession } from 'expo';
import { Keyboard, AsyncStorage, TouchableOpacity } from 'react-native';
// import twitter, { TWLoginButton } from 'react-native-simple-twitter';
import { useTwitter } from 'react-native-simple-twitter';
import * as AppleAuthentication from 'expo-apple-authentication';

import firebase, { createCustomToken } from '~/lib/firebase';
import {
  // getTwitterAccessToken,
  // getTwitterRequestToken,
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} from '~/lib/twitter';

import { TITAN_TERMS_OF_USE, TITAN_PRIVACY_POLICY } from '~/constants/appInfo';

import TouchableText from './TouchableText';

// import SubmitButton from './SubmitButton';
import { successToast, errorToast } from './Toast';
import { isiOS, appleIPHead } from '~/native/lib/native';
import { getPublicIP } from '~/native/lib/network';
// import axios from '~/lib/axios';

const LOGIN_MESSAGE_SUCCESS = 'ログインに成功しました';

const AuthScreen = (props: any) => {
  const { history, signInSuccessWithAuthResult } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAppleSingInAvailable, setIsAppleSignInAvailable] = useState(false);

  const [me, setMe] = useState<any>({});
  const [token, setToken] = useState({});

  const [ip, setIP] = useState('');
  const { twitter, TWModal } = useTwitter({
    onSuccess: (user, accessToken) => {
      setMe(user);
      setToken(accessToken);
    }
  });

  useEffect(() => {
    twitter.setConsumerKey(TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET);

    /* check AsyncStorage */
    AsyncStorage.getItem('token').then(async accessToken => {
      if (accessToken !== null) {
        const userToken = JSON.parse(accessToken);
        twitter.setAccessToken(
          userToken.oauth_token,
          userToken.oauth_token_secret
        );

        /* eslint-disable */
        const options = {
          include_entities: false,
          skip_status: true,
          include_email: true
        };
        /* eslint-enable */

        try {
          const response = await twitter.api(
            'GET',
            'account/verify_credentials.json',
            options
          );
        } catch (e) {
          console.log(e.errors);
        }
      }
    });

    AppleAuthentication.isAvailableAsync().then((result: any) =>
      setIsAppleSignInAvailable(result)
    );

    getPublicIP().then((ip: string) => setIP(ip));
  }, [twitter]);

  useEffect(() => {
    // @ts-ignore
    if (token.oauth_token && token.oauth_token_secret && me) {
      const saveToAsyncStorage = async () => {
        await AsyncStorage.setItem('token', JSON.stringify(token));
        await AsyncStorage.setItem('user', JSON.stringify(me));

        const credential = firebase.auth.TwitterAuthProvider.credential(
          // @ts-ignore
          token.oauth_token,
          // @ts-ignore
          token.oauth_token_secret
        );

        firebase
          .auth()
          .signInWithCredential(credential)
          .then(credential => signInSuccessWithAuthResult(credential))
          .then(() => successToast('/', history.push, LOGIN_MESSAGE_SUCCESS))
          .catch(error => errorToast(error.message));
      };

      saveToAsyncStorage();
    }
  }, [history.push, me, signInSuccessWithAuthResult, token]);

  const signInWithEmail = (email: string, password: string) => {
    // キーボードは閉じる
    Keyboard.dismiss();

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(credential => signInSuccessWithAuthResult(credential))
      .then(() => successToast('/', history.push, LOGIN_MESSAGE_SUCCESS))
      .catch(() =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(credential => signInSuccessWithAuthResult(credential))
          .then(() =>
            successToast('/settings', history.push, LOGIN_MESSAGE_SUCCESS)
          )
          .catch(error => errorToast(error.message))
      );
  };

  // 一旦お蔵入り...
  // const signUpWithTwitter = async () => {
  //   const res: any = await getTwitterRequestToken();
  //   const { oauth_token, oauth_token_secret } = res; //eslint-disable-line

  //   /* eslint-disable */
  //   if (!oauth_token || !oauth_token_secret) {
  //     errorToast(oauth_token);
  //     return;
  //   }
  //   /* eslint-enable */

  //   const authUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${oauth_token}`; //eslint-disable-line

  //   /* eslint-disable */
  //   const oauth_verifier = await AuthSession.startAsync({
  //     authUrl,
  //     returnUrl: 'scheme://'
  //   }).then((res: any) => res.params.oauth_verifier);
  //   /* eslint-enable */

  //   const result: any = await getTwitterAccessToken({
  //     oauth_token, //eslint-disable-line
  //     oauth_token_secret, //eslint-disable-line
  //     oauth_verifier //eslint-disable-line
  //   });

  //   /* eslint-disable */
  //   if (
  //     result.status !== 200 ||
  //     !(result.data.oauth_token && result.data.oauth_token_secret)
  //   ) {
  //     errorToast(result.data.message);
  //     return;
  //   }
  //   /* eslint-enable */

  //   const credential = firebase.auth.TwitterAuthProvider.credential(
  //     result.data.oauth_token, //eslint-disable-line
  //     result.data.oauth_token_secret //eslint-disable-line
  //   );

  //   firebase
  //     .auth()
  //     .signInWithCredential(credential)
  //     .then(credential => signInSuccessWithAuthCallback(credential))
  //     .then(() => successToast('/', history.push, LOGIN_MESSAGE_SUCCESS))
  //     .catch(error => errorToast(error.message));
  // };

  const signInWithTwitter = async () => {
    try {
      await twitter.login();
    } catch (e) {
      console.log(e.errors);
    }
  };

  const signUpWithCustomToken = (token: string) => {
    const isApple = isiOS && ip.split('.')[0] === appleIPHead;
    return createCustomToken(token, isApple).then((token: string) => {
      return firebase.auth().signInWithCustomToken(token);
    });
  };

  const signInWithApple = () =>
    AppleAuthentication.signInAsync({
      requestedScopes: [
        // AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL
      ]
    })
      .then((credential: any) => {
        const token = credential.user;
        return signUpWithCustomToken(token);
      })
      .then(credential => signInSuccessWithAuthResult(credential))
      .then(() =>
        successToast('/settings', history.push, LOGIN_MESSAGE_SUCCESS)
      )
      .catch(error => errorToast(error.message));

  return (
    <Container>
      <Button full rounded info>
        <TouchableOpacity onPress={signInWithTwitter}>
          <Text>Twitterでログイン</Text>
        </TouchableOpacity>
      </Button>
      <TWModal />
      <Text />
      <Text style={{ textAlign: 'center' }}>または</Text>
      <Form>
        <Item floatingLabel>
          <Label>メールアドレス</Label>
          <Input
            autoCapitalize="none"
            autoCorrect
            onChangeText={text => setEmail(text)}
          />
        </Item>
        <Item floatingLabel>
          <Label>パスワード</Label>
          <Input
            secureTextEntry
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => setPassword(text)}
          />
        </Item>
        <Text />
        <Button
          full
          rounded
          primary
          onPress={() => signInWithEmail(email, password)}
        >
          <Text>メールでログイン</Text>
        </Button>
      </Form>
      {isAppleSingInAvailable && (
        <View
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text />
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN
            }
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
            }
            cornerRadius={5}
            style={{ width: 200, height: 44 }}
            onPress={signInWithApple}
          />
        </View>
      )}
      <Text />
      <Text style={{ padding: 10 }}>
        ユーザ登録がまだの方も、ログインの延長でユーザ登録が可能です。
        登録の前に、利用規約とプライバシーポリシーをご確認ください。
        登録の完了を以て、利用規約に同意したものとします。
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center'
        }}
      >
        <TouchableText
          external
          url={TITAN_TERMS_OF_USE}
          text="利用規約"
          underline
        />
        <TouchableText
          external
          underline
          url={TITAN_PRIVACY_POLICY}
          text="プライバシーポリシー"
        />
      </View>
    </Container>
  );
};

export default withRouter(AuthScreen);
