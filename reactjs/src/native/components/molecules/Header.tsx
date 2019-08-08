import React from 'react';
import { Header, Body, Icon, Left, Right, Button, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Link, withRouter } from 'react-router-native';

import firebase from '~/lib/firebase';
import TouchableText from '../atoms/TouchableText';
import { brandWhite } from '~/lib/theme';

const HeaderWrapper = (props: any) => {
  const { openDrawer, isLogin, history } = props;

  return (
    <React.Fragment>
      <Header>
        <Left>
          <Button transparent onPress={() => openDrawer()}>
            <Icon name="menu" style={{ color: brandWhite }} />
          </Button>
        </Left>
        <Body>
          <TouchableOpacity onPress={() => history.push('/')}>
            <Text
              style={{
                color: brandWhite,
                fontSize: 24,
                fontWeight: 'bold'
              }}
            >
              Titan
            </Text>
          </TouchableOpacity>
        </Body>
        <Right>
          {isLogin ? (
            <Button
              bordered
              onPress={() => {
                firebase.auth().signOut();
                history.push('/');
              }}
            >
              <Text style={{ color: brandWhite, fontWeight: 'bold' }}>
                ログアウト
              </Text>
            </Button>
          ) : (
            <Button bordered>
              <TouchableText path="/login" text="ログイン" color={brandWhite} />
            </Button>
          )}
        </Right>
      </Header>
    </React.Fragment>
  );
};

export default withRouter(HeaderWrapper);
