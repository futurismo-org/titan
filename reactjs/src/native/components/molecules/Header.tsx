import React from 'react';
import { Header, Body, Icon, Left, Right, Button, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { Link, withRouter } from 'react-router-native';

import firebase from '~/lib/firebase';

const HeaderWrapper = (props: any) => {
  const { openDrawer, isLogin, history } = props;

  return (
    <React.Fragment>
      <Header>
        <Left>
          <Button transparent onPress={() => openDrawer()}>
            <Icon name="menu" style={{ color: '#ffffff' }} />
          </Button>
        </Left>
        <Body>
          <TouchableOpacity onPress={() => history.push('/')}>
            <Text
              style={{
                color: '#fff',
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

export default withRouter(HeaderWrapper);
