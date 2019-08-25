import React, { useState, useEffect } from 'react';
import { Text, Content, View } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Title from '../../atoms/Title';

import Progress from '../../atoms/CircularProgress';
import UserAvatar from '../../atoms/UserAvatar';
import { getChallengeUserGoalPath } from '~/lib/url';
import ChallengeGoalCard from '../../atoms/challenges/ChallengeGoalCard';

import { deviceWidth } from '~/native/lib/native';
import { brandGray } from '~/lib/theme';

const ChallengeGoals = (props: any) => {
  const { fetchGoals, challengeId } = props;

  const [goals, setGoals] = useState([]);
  const [notSetGoals, setNotSetGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchGoals()
      .then(async (props: any) => {
        const { goals, users } = props;
        setGoals(goals);

        const goalIds = goals.map((goal: any) => goal.id);
        const notSetGoals = users.filter(
          (user: any) => !goalIds.includes(user.id)
        );
        setNotSetGoals(notSetGoals);
      })
      .then(() => setLoading(false));
  }, [fetchGoals]);

  const [goalActiveSlide, setGoalActiveSlide] = useState(0);
  const [goalSliderRef, setGoalSliderRef] = useState(undefined);

  const _renderGoalItem = (props: any) => {
    const { item, index } = props;
    return (
      <ChallengeGoalCard goal={item} challengeId={challengeId} key={index} />
    );
  };

  return (
    <React.Fragment>
      <Content padder>
        {loading && <Progress />}
        {!loading && goals.length === 0 && (
          <Text>目標をまだだれも設定していません。</Text>
        )}
        {!loading && goals.length !== 0 && (
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
            ) : null}
          </React.Fragment>
        )}
        <Text />
        {notSetGoals.length !== 0 && (
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
