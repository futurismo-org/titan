import React, { useState } from 'react';
import {
  Container,
  Form,
  Item,
  Label,
  Input,
  Button,
  Text,
  Toast
} from 'native-base';
import shortid from 'shortid';
import { withRouter } from 'react-router-native';
import firebase from '~/lib/firebase';

const AuthScreen = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signInSuccessWithAuthCallback = (
    credentials: firebase.auth.UserCredential
  ) => {
    const { user } = credentials;

    const isTwitter =
      credentials.additionalUserInfo &&
      credentials.additionalUserInfo.providerId === 'twitter.com';

    const data = {
      id: user!.uid,
      shortId: shortid.generate(),
      displayName: user!.displayName,
      photoURL: user!.photoURL,
      createdAt: new Date(),
      updatedAt: new Date(),
      twitterUsername: isTwitter
        ? (credentials.additionalUserInfo! as any).username
        : ''
    };

    const secureId = shortid.generate();
    const dataSecure = {
      id: secureId,
      email: user!.email,
      accessTokenKey: isTwitter
        ? (credentials.credential! as any).accessToken
        : '',
      accessTokenSecret: isTwitter
        ? (credentials.credential! as any).secret
        : ''
    };

    const userRef = firebase
      .firestore()
      .collection('users')
      // uidにしないと、reduxのprofileとfirestoreのusersが同期しない。
      .doc(user!.uid);

    userRef.get().then(doc => {
      if (!doc.exists) {
        userRef.set(data);
        userRef
          .collection('securities')
          .doc(secureId)
          .set(dataSecure);
      }
    });

    return false;
  };

  const successToast = () =>
    Toast.show({
      text: 'ログインに成功しました！',
      duration: 3000,
      onClose: () => props.history.push('/')
    });

  const errorToast = (message: string) =>
    Toast.show({
      text: `ログインに失敗しました。(${message})`,
      duration: 3000
    });

  const signInWithEmail = (email: string, password: string) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(credential => signInSuccessWithAuthCallback(credential))
      .then(() => successToast())
      .catch(() =>
        firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(credential => signInSuccessWithAuthCallback(credential))
          .then(() => successToast())
          .catch(error => errorToast(error.message))
      );
  };

  return (
    <Container>
      <Button full rounded info>
        <Text>Twitterでログイン</Text>
      </Button>
      <Text />
      <Text style={{ textAlign: 'center' }}>または</Text>
      <Form>
        <Item floatingLabel>
          <Label>メールアドレス</Label>
          <Input
            autoCapitalize="none"
            autoCorrect={false}
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
    </Container>
  );
};

export default withRouter(AuthScreen);
