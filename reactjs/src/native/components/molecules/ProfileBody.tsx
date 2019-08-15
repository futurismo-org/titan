import React, { useState, useEffect } from 'react';
import { View, Text, Content } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Title from '../atoms/Title';
import CollectionCard from '~/native/containers/CollectionCardContainer';

import { deviceWidth } from '~/native/lib/native';

import Error from '../atoms/Error';
import { brandGray } from '~/lib/theme';
import ProfileCategories from './ProfileCategories';
import ProfileChallenges from './ProfileChallenges';

const ProfileBody = (props: any) => {
  const {
    currentChallenges,
    pastChallenges,
    categories,
    fetchProfileChallenges,
    fetchProfileCategories,
    userShortId,
    loading,
    error
  } = props;

  useEffect(() => {
    fetchProfileChallenges(userShortId);
    fetchProfileCategories(userShortId);
  }, [fetchProfileCategories, fetchProfileChallenges, userShortId]);

  const [currentActiveSlide, setCurrentActiveSlide] = useState(0);
  const [currentSliderRef, setCurrentSliderRef] = useState(undefined);

  const _renderChallengeItem = (props: any) => {
    const { item, index } = props;
    return <CollectionCard collection={item} type="challenges" key={index} />;
  };

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {!loading && (
        <View style={{ padding: 10 }}>
          <Title text="参加中のチャレンジ" />
          {currentChallenges && currentChallenges.length !== 0 ? (
            <React.Fragment>
              <Carousel
                ref={(c: any) => setCurrentSliderRef(c)}
                data={currentChallenges}
                renderItem={_renderChallengeItem}
                itemWidth={deviceWidth}
                sliderWidth={deviceWidth}
                onSnapToItem={index => setCurrentActiveSlide(index)}
              />
              <Pagination
                dotsLength={currentChallenges.length}
                activeDotIndex={currentActiveSlide}
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
                carouselRef={currentSliderRef}
                tappableDots={!!currentSliderRef}
              />
            </React.Fragment>
          ) : (
            <Text style={{ alignSelf: 'center' }}>
              現在、参加中のチャレンジはありません。
            </Text>
          )}
          <Text />
          <Title text="所属カテゴリ" />
          {categories && categories.length !== 0 ? (
            <ProfileCategories
              refs={categories.map((category: any) => category.ref)}
            />
          ) : (
            <Text style={{ alignSelf: 'center' }}>
              現在、所属しているカテゴリはありません。
            </Text>
          )}
          <Title text="過去のチャレンジ実績" />
          {pastChallenges && pastChallenges.length !== 0 ? (
            <ProfileChallenges
              challenges={pastChallenges}
              userShortId={userShortId}
            />
          ) : (
            <Text style={{ alignSelf: 'center' }}>
              過去に参加したチャレンジはありません。
            </Text>
          )}
        </View>
      )}
    </React.Fragment>
  );
};

export default ProfileBody;
