import * as React from 'react';
import { Content } from 'native-base';

import {
  StyledHero as Hero,
  Title,
  Description,
  Info
} from '~/native/components/atoms/Hero';

import { challengePeriod } from '~/lib/challenge';
import ChallengeCategoryBadge from '../../atoms/challenges/ChallengeCategoryBadge';

const ChallengeHeader = (props: any) => {
  const { challenge } = props;

  return (
    <Hero
      source={{ uri: 'https://source.unsplash.com/random' }}
      renderOverlay={() => (
        <Content padder>
          <Title>{challenge.title}</Title>
          <Description>{challenge.description}</Description>
          <ChallengeCategoryBadge categoryRef={challenge.categoryRef} />
          <Info>
            価格 {challenge.price || 0}円 {challenge.participantsCount}人参加中{' '}
            {challengePeriod(challenge)}
          </Info>
        </Content>
      )}
    />
  );
};

export default ChallengeHeader;
