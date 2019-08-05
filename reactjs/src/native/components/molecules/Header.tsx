import React from 'react';
import {
  Header,
  Title,
  Body,
  Icon,
  Left,
  Right,
  Button,
  Text
} from 'native-base';
import { Link } from 'react-router-native';

import firebase from '~/lib/firebase';

const HeaderWrapper = (props: any) => {
  const { openDrawer, isLogin } = props;

  return (
    <React.Fragment>
      <Header>
        <Left>
          <Button transparent onPress={() => openDrawer()}>
            <Icon name="menu" style={{ color: '#ffffff' }} />
          </Button>
        </Left>
        <Body>
          <Link to="/">
            <Title>Titan</Title>
          </Link>
        </Body>
        <Right>
          {isLogin ? (
            <Button bordered onPress={() => firebase.auth().signOut()}>
              <Text style={{ color: '#ffffff' }}>ログアウト</Text>
            </Button>
          ) : (
            <Button bordered>
              <Link to="/login">
                <Text style={{ color: '#ffffff' }}>ログイン</Text>
              </Link>
            </Button>
          )}
        </Right>
      </Header>
    </React.Fragment>
  );
};

export default HeaderWrapper;
