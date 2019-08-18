import * as React from 'react';

import { Content, View } from 'native-base';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

import { getAchieveRate, getResetDays } from '~/lib/challenge';

const WidgetRow = (props: any) => (
  <View
    style={{
      paddingLeft: 10,
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}
  >
    {props.children}
  </View>
);

const ChallengeStatistics = (props: any) => {
  const { data } = props;

  const resetDays = getResetDays(data.histories);
  const achieveRate = getAchieveRate(resetDays, data.accDays);

  return (
    <Content>
      <WidgetRow>
        <NumberWidget title="スコア" number={data.score} unit="" />
        <NumberWidget title="達成率" number={achieveRate} unit="%" />
      </WidgetRow>
      <WidgetRow>
        <NumberWidget
          title="大会累積日数"
          number={data.accDays || 0}
          unit="days"
        />
        <NumberWidget title="リセット回数" number={resetDays} unit="days" />
      </WidgetRow>
      <WidgetRow>
        <NumberWidget title="大会連続日数" number={data.days} unit="days" />

        <NumberWidget
          title="過去連続日数"
          number={data.pastDays || data.days}
          unit="days"
        />
      </WidgetRow>
    </Content>
  );
};

export default ChallengeStatistics;
