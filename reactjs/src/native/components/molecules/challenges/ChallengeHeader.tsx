import * as React from 'react';
import { Content, View } from 'native-base';

import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import {
  StyledHero as Hero,
  Title,
  Description,
  Info
} from '~/native/components/atoms/Hero';

import { challengePeriod, isChallengeClosed } from '~/lib/challenge';
import ChallengeCategoryBadge from '../../atoms/challenges/ChallengeCategoryButton';

import ChallengeButton from '~/native/containers/ChallengeButtonContainer';
import { getRandomImageURL } from '~/lib/url';

const ChallengeHeader = (props: any) => {
  const { challenge, isLogin, history, join } = props;

  return (
    <React.Fragment>
      <Hero
        source={{ uri: getRandomImageURL() }}
        renderOverlay={() => (
          <Content padder>
            <TouchableOpacity
              onPress={() => history.push(`/c/${challenge.id}/overview`)}
            >
              <Title>{challenge.title}</Title>
            </TouchableOpacity>
            <Description>{challenge.description}</Description>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              {challenge.categoryRef && (
                <ChallengeCategoryBadge categoryRef={challenge.categoryRef} />
              )}
              {isLogin && !isChallengeClosed(challenge.closedAt.toDate()) ? (
                <ChallengeButton challenge={challenge} join={join} />
              ) : null}
            </View>
            <Info>
              {/* 価格 {challenge.price || 0}円 */}
              {challenge.participantsCount}人参加中 {challengePeriod(challenge)}
            </Info>
          </Content>
        )}
      />
    </React.Fragment>
  );
};

export default withRouter(ChallengeHeader);
