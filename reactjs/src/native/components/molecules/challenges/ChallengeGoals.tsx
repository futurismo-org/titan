import React, { useState, useEffect } from 'react';
import { Text, Content, View } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Title from '../../atoms/Title';

import Error from '../../atoms/Error';
import Progress from '../../atoms/CircularProgress';
import UserAvatar from '../../atoms/UserAvatar';
import { getChallengeUserGoalPath } from '~/lib/url';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';

import { deviceWidth } from '~/native/lib/native';
import { brandGray } from '~/lib/theme';

const ChallengeGoals = (props: any) => {
  const {
    fetchParticipants,
    resourceId,
    participants,
    loading,
    error,
    challengeId,
    goals,
    notSetGoals,
    fetchChallengeObjectives
  } = props;

  const [isParticipantsFeached, setIsParticipantsFetched] = useState(false);

  const [goalActiveSlide, setGoalActiveSlide] = useState(0);
  const [goalSliderRef, setGoalSliderRef] = useState(undefined);

  const _renderGoalItem = (props: any) => {
    const { item, index } = props;
    return (
      <ChallengeGoalCard goal={item} challengeId={challengeId} key={index} />
    );
  };

  useEffect(() => {
    if (!isParticipantsFeached) {
      setIsParticipantsFetched(true);
      fetchParticipants(resourceId);
    }
    participants.length !== 0 &&
      fetchChallengeObjectives(participants, challengeId);
  }, [
    challengeId,
    fetchChallengeObjectives,
    fetchParticipants,
    isParticipantsFeached,
    participants,
    resourceId
  ]);

  return (
    <React.Fragment>
      <Content padder>
        {error && <Error error={error} />}
        {loading ? <Progress /> : null}
        {!loading && !!goals && (
          <React.Fragment>
            <Title text="仲間たちのチャレンジ目標" />
            {goals.length !== 0 ? (
              <React.Fragment>
                <Carousel
                  ref={(c: any) => setGoalSliderRef(c)}
                  data={goals}
                  renderItem={_renderGoalItem}
                  sliderWidth={deviceWidth}
                  itemWidth={deviceWidth}
                  onSnapToItem={index => setGoalActiveSlide(index)}
                />
                <Pagination
                  dotsLength={goals.length}
                  activeDotIndex={goalActiveSlide}
                  containerStyle={{ paddingVertical: 0 }}
                  dotColor="gray"
                  dotStyle={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    marginHorizontal: 8,
                    marginVertical: 8
                  }}
                  inactiveDotColor={brandGray}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={goalSliderRef}
                  tappableDots={!!goalSliderRef}
                />
              </React.Fragment>
            ) : (
              <Text>目標をまだ誰も設定していせん。</Text>
            )}
          </React.Fragment>
        )}
        <Text />
        {!loading && !!notSetGoals && (
          <React.Fragment>
            <Text>目標をまだ設定していないユーザ</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: 5,
                padding: 5
              }}
            >
              {notSetGoals.map((user: any) => {
                return (
                  <UserAvatar
                    key={user.id}
                    photoURL={user.photoURL}
                    userId={user.id}
                    to={getChallengeUserGoalPath(challengeId, user.id)}
                  />
                );
              })}
            </View>
          </React.Fragment>
        )}
      </Content>
    </React.Fragment>
  );
};

export default ChallengeGoals;
