import * as React from 'react';
import styled from 'styled-components/native';
import { Text, View } from 'react-native';

import { NativeRouter, Link } from 'react-router-native';
import { Navigation, Card } from 'react-router-navigation';

import Constants from 'expo-constants';

const Container = styled(View)`
  flex: 1px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const App = () => (
  <NativeRouter>
    <Navigation>
      <Card
        exact
        path="/"
        render={() => (
          <Link to="/hello">
            <Text>Press it</Text>
          </Link>
        )}
      />
      <Card path="/hello" render={() => <Text>Hello</Text>} />
    </Navigation>
  </NativeRouter>
);

export default App;
