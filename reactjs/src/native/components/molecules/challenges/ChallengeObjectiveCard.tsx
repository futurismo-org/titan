import React from 'react';
import { Card, CardItem, Text, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';

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
        <Card
          style={{
            paddingLeft: 25,
            paddingRight: 25,
            width: 320,
            backgroundColor: 'transparent'
          }}
        >
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
        </Card>
      </LinearGradient>
    </View>
  );
};

export const ChallengeObjectiveWhyCard = (props: any) => {
  const { text } = props;

  return (
    <View>
      <Text note>なぜやるのか？</Text>
      <Text>{text}</Text>
    </View>
  );
};
