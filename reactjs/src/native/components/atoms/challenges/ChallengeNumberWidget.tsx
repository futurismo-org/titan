import * as React from 'react';

import styled from 'styled-components';
import { Card, CardItem, Body, Text, View } from 'native-base';

const StyledCard = styled(Card)`
  width: 150px;
`;

const NumberWidget = ({ title, number, unit, ...props }: any) => (
  <StyledCard>
    <CardItem header>
      <Text>{title}</Text>
    </CardItem>
    <CardItem>
      <Body>
        <View style={{ paddingLeft: 10, flex: 1 }}>
          <Text>
            <Text style={{ fontWeight: 'bold', fontSize: 48 }}>{number}</Text>
            <Text style={{ fontSize: 24 }}>{unit}</Text>
          </Text>
        </View>
      </Body>
    </CardItem>
  </StyledCard>
);

export default NumberWidget;
