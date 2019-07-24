import * as React from 'react';
import styled from 'styled-components';
import { Card, CardItem, Text, View } from 'native-base';

const StyledCard = styled(Card)`
  border: 0;
  padding: 0 25px;
  width: 300px;
  height: 250px;
`;

const RecordBoard = (props: any) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <StyledCard>
      <CardItem header>
        <View style={{ flex: 1 }}>
          <Text>
            <Text style={{ fontWeight: 'bold', fontSize: 96 }}>
              {props.days}
            </Text>
            <Text style={{ fontSize: 32 }}>days</Text>
          </Text>
        </View>
      </CardItem>
      <CardItem footer>
        <Text style={{ fontSize: 32 }}>達成しました</Text>
      </CardItem>
    </StyledCard>
  </View>
);

export default RecordBoard;
