import * as React from 'react';
import { Header, Title, Body, Icon, Left, Button } from 'native-base';

const HeaderWrapper = (props: any) => {
  const { drawerRef } = props;
  return (
    <React.Fragment>
      <Header>
        {/* <Left>
          <Ionicons name="menu" />
        </Left> */}
        <Body>
          <Title>Titan</Title>
        </Body>
      </Header>
    </React.Fragment>
  );
};

export default HeaderWrapper;
