import * as React from 'react';

import { Content } from 'native-base';
import NumberWidget from '../../atoms/challenges/ChallengeNumberWidget';

import { getTotalDays, getAchieveRate } from '~/lib/challenge';

const ChallengeStatistics = (props: any) => {
  const { data, openedAt, closedAt } = props;

  const totalDays = getTotalDays(openedAt.toDate(), closedAt.toDate(), data);
  const achieveRate = getAchieveRate(totalDays, data.accDays);

  return (
    <Content>
      <NumberWidget title="スコア" number={data.score} unit="" />
      <NumberWidget title="達成率" number={achieveRate} unit="%" />
      <NumberWidget
        title="大会累積日数"
        number={data.accDays || 0}
        unit="days"
      />
      <NumberWidget title="大会連続日数" number={data.days} unit="days" />
      <NumberWidget
        title="過去連続日数"
        number={data.pastDays || data.days}
        unit="days"
      />
      <NumberWidget title="経過日数" number={totalDays} unit="days" />
    </Content>
  );
};

export default ChallengeStatistics;
