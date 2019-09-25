import React from 'react';
import { Card, CardItem, Text, View } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import MarkdownView from '../../atoms/MarkdownView';

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

export const ChallengeObjectiveWOOPCard = (props: any) => {
  const { wish, outcome, obstacle, plan } = props;

  return (
    <React.Fragment>
      {wish || outcome || obstacle || plan ? (
        <View>
          {!!plan && (
            <React.Fragment>
              <Text note>if-thenプランニング(Plan)</Text>
              <MarkdownView text={plan} />
              <Text />
            </React.Fragment>
          )}
          {!!wish && (
            <React.Fragment>
              <Text note>なぜやるのか？(Wish)</Text>
              <MarkdownView text={wish} />
              <Text />
            </React.Fragment>
          )}
          {!!outcome && (
            <React.Fragment>
              <Text note>最大の成果(Outcome)</Text>
              <MarkdownView text={outcome} />
              <Text />
            </React.Fragment>
          )}
          {!!obstacle && (
            <React.Fragment>
              <Text note>目標を妨げるもの(Obstacle)</Text>
              <MarkdownView text={obstacle} />
              <Text />
            </React.Fragment>
          )}
        </View>
      ) : (
        <Text>WOOP法をつかって目標をさらに分析しましょう。</Text>
      )}
    </React.Fragment>
  );
};
