import * as React from 'react';
import { Content, View } from 'native-base';

import { Link } from 'react-router-native';
import {
  StyledHero as Hero,
  Title,
  Description,
  Info
} from '~/native/components/atoms/Hero';

import { challengePeriod, isChallengeClosed } from '~/lib/challenge';
import ChallengeCategoryBadge from '../../atoms/challenges/ChallengeCategoryBadge';

import ChallengeButton from '~/native/containers/ChallengeButtonContainer';

const ChallengeHeader = (props: any) => {
  const { challenge, isLogin } = props;

  return (
    <React.Fragment>
      <Hero
        source={{ uri: 'https://source.unsplash.com/random' }}
        renderOverlay={() => (
          <Content padder>
            <Link to={`/c/${challenge.id}/overview`}>
              <Title>{challenge.title}</Title>
            </Link>
            <Description>{challenge.description}</Description>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <ChallengeCategoryBadge categoryRef={challenge.categoryRef} />
              {isLogin && !isChallengeClosed(challenge.closedAt.toDate()) ? (
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
