import * as React from 'react';
import styled from 'styled-components';
import {
  Card,
  CardItem,
  Text,
  View,
  Body,
  List,
  ListItem,
  Left,
  Right
} from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import UserAvatar from '../../atoms/UserAvatar';

const StyledCard = styled(Card)`
  border: 0;
  padding: 0 25px;
  width: 320px;
  background-color: transparent;
`;

export const ChallengeObjectiveWhatCard = (props: any) => {
  const { text } = props;

  return (
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
          <CardItem
            cardBody
            style={{
              backgroundColor: 'transparent',
              marginTop: 25,
              marginBottom: 25
            }}
          >
            <Text style={{ fontSize: 24 }}>{text}</Text>
          </CardItem>
        </StyledCard>
      </LinearGradient>
    </View>
  );
};

export const ChallengeObjectiveWhyCard = (props: any) => {
  const { text, user } = props;

  return (
    <List>
      <ListItem>
        <Body>
          <Text note>なぜやるのか？</Text>
          <Text>{text}</Text>
        </Body>
      </ListItem>
    </List>
  );
};
