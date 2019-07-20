import * as React from 'react';
import { Text } from 'react-native';
import { Header, Title, Body, Icon, Left, Right, Button } from 'native-base';

const HeaderWrapper = (props: any) => {
  return (
    <React.Fragment>
      <Header>
        <Left>
          <Button transparent onPress={() => props.navigation.openDrawer()}>
            <Icon name="menu" style={{ color: '#ffffff' }} />
          </Button>
        </Left>
        <Body>
          <Title>Titan</Title>
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
