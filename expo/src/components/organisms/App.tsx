import * as React from 'react';
import { Text, View } from 'react-native';

import styled from 'styled-components/native';

const Container = styled(View)`
  flex: 1px;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

const App = () => (
  <Container>
    <Text>Hello, Expo</Text>
    <Text>Awesome</Text>
  </Container>
);

export default App;
