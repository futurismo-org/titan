import * as React from 'react';
import styled from 'styled-components';
import { Card, CardItem, Text, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

const StyledCard = styled(Card)`
  border: 0;
  padding: 0 25px;
  width: 320px;
  height: 250px;
  background-color: transparent;
`;

const RecordBoard = (props: any) => (
  <View
    style={{
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    <LinearGradient
      colors={['#fe6b8b', '#ff8e53']}
      start={{ x: 0.0, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      <StyledCard>
        <CardItem header style={{ backgroundColor: 'transparent' }}>
          <View style={{ flex: 1 }}>
            <Text>
              <Text style={{ fontWeight: 'bold', fontSize: 96 }}>
                {props.days}
              </Text>
              <Text style={{ fontSize: 36 }}>days</Text>
            </Text>
          </View>
        </CardItem>
        <CardItem footer style={{ backgroundColor: 'transparent' }}>
          <Text style={{ fontSize: 36 }}>達成しました</Text>
        </CardItem>
      </StyledCard>
    </LinearGradient>
  </View>
);

export default RecordBoard;
