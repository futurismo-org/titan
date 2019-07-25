import * as React from 'react';
import { Content, Text, View } from 'native-base';

import {
  StyledHero as Hero,
  Title,
  Description,
  Info
} from '~/native/components/atoms/Hero';

import { challengePeriod, isChallengeClosed } from '~/lib/challenge';
import ChallengeCategoryBadge from '../../atoms/challenges/ChallengeCategoryBadge';

import ChallengeButton from '../../atoms/challenges/ChallengeButton';

const ChallengeHeader = (props: any) => {
  const { challenge } = props;

  return (
    <React.Fragment>
      <Hero
        source={{ uri: 'https://source.unsplash.com/random' }}
        renderOverlay={() => (
          <Content padder>
            <Title>{challenge.title}</Title>
            <Description>{challenge.description}</Description>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <ChallengeCategoryBadge categoryRef={challenge.categoryRef} />
              {!isChallengeClosed(challenge.closedAt.toDate()) ? (
                <ChallengeButton challenge={challenge} />
              ) : null}
            </View>
            <Info>
              価格 {challenge.price || 0}円 {challenge.participantsCount}
              人参加中 {challengePeriod(challenge)}
            </Info>
          </Content>
        )}
      />
    </React.Fragment>
  );
};

export default ChallengeHeader;
