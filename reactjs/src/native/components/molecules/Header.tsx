import * as React from 'react';
import { Text } from 'react-native';
import { Header, Title, Body, Icon, Left, Right, Button } from 'native-base';
import { Link } from 'react-router-native';

const HeaderWrapper = (props: any) => {
  const { openDrawer } = props;

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
          <Button bordered>
            <Text style={{ color: '#ffffff' }}>ログイン</Text>
          </Button>
        </Right>
      </Header>
    </React.Fragment>
  );
};

export default HeaderWrapper;
