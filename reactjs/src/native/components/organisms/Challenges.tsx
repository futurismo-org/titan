import * as React from 'react';
import { View } from 'react-native';
import Title from '../atoms/Title';
import Error from '../atoms/Error';
import CollectionCard from '~/native/containers/CollectionCardContainer';
import { isReady } from '~/lib/firebase';

const Challenges = (props: any) => {
  const {
    preOpenChallenges,
    openingChallenges,
    closedChallenges,
    challenges
  } = props;

  return (
    <React.Fragment>
      {!isReady(challenges) && null}
      {openingChallenges && <Title text="開催中のチャレンジ" />}
      {openingChallenges &&
        openingChallenges.map((challenge: any) => (
          <View style={{ marginTop: 5, marginBottom: 5 }} key={challenge.id}>
            <CollectionCard collection={challenge} type="challenges" />
          </View>
        ))}
      {preOpenChallenges && <Title text="開催前のチャレンジ" />}
      {preOpenChallenges &&
        preOpenChallenges.map((challenge: any) => (
          <View style={{ marginTop: 5, marginBottom: 5 }} key={challenge.id}>
            <CollectionCard
              collection={challenge}
              type="challenges"
              key={challenge.id}
            />
          </View>
        ))}
      {closedChallenges && <Title text="開催終了のチャレンジ" />}
      {closedChallenges &&
        closedChallenges.map((challenge: any) => (
          <View style={{ marginTop: 5, marginBottom: 5 }} key={challenge.id}>
            <CollectionCard
              collection={challenge}
              type="challenges"
              key={challenge.id}
            />
          </View>
        ))}
    </React.Fragment>
  );
};

export default Challenges;
