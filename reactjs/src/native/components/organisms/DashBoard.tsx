import React, { useState } from 'react';
import { Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CollectionCard from '~/native/containers/CollectionCardContainer';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import MoreLink from '../atoms/MoreLink';
import { carouselGray } from '~/lib/theme';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    pinned,
    loading,
    error,
    fetchChallenges,
    fetchCategories,
    fetchPinnedChallenges
  } = props;

  const [pinnedActiveSlide, setPinnedActiveSlide] = useState(0);
  const [pinnedSliderRef, setPinnedSliderRef] = useState(undefined);
  const [categoryActiveSlide, setCategoryActiveSlide] = useState(0);
  const [categorySliderRef, setCategorySliderRef] = useState(undefined);
  const [challengeActiveSlide, setChallengeActiveSlide] = useState(0);
  const [challengeSliderRef, setChallengeSliderRef] = useState(undefined);

  React.useEffect(() => {
    fetchChallenges(6);
    fetchCategories(6);
    fetchPinnedChallenges();
  }, [fetchCategories, fetchChallenges, fetchPinnedChallenges]);

  const _renderChallengeItem = (props: any) => {
    const { item, index } = props;
    return <CollectionCard collection={item} type="challenges" key={index} />;
  };

  const _renderCategoryItem = (props: any) => {
    const { item, index } = props;
    return <CollectionCard collection={item} type="categories" key={index} />;
  };

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {!loading && (
        <React.Fragment>
          <Title text="運営からのおすすめ" />
          <Carousel
            ref={(c: any) => setPinnedSliderRef(c)}
            data={pinned}
            renderItem={_renderChallengeItem}
            itemWidth={400}
            sliderWidth={400}
            loop
            onSnapToItem={index => setPinnedActiveSlide(index)}
          />
          <Pagination
            dotsLength={pinned.length}
            activeDotIndex={pinnedActiveSlide}
            containerStyle={{ paddingVertical: 0 }}
            dotColor="gray"
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 8,
              marginVertical: 8
            }}
            inactiveDotColor={carouselGray}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={pinnedSliderRef}
            tappableDots={!!pinnedSliderRef}
          />
          <MoreLink to="/challenges" />
          <Title text="人気のカテゴリ" />
          <Carousel
            ref={(c: any) => setCategorySliderRef(c)}
            data={categories}
            renderItem={_renderCategoryItem}
            sliderWidth={400}
            itemWidth={400}
            loop
            onSnapToItem={index => setCategoryActiveSlide(index)}
          />
          <Pagination
            dotsLength={categories.length}
            activeDotIndex={categoryActiveSlide}
            containerStyle={{ paddingVertical: 0 }}
            dotColor="gray"
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 8,
              marginVertical: 8
            }}
            inactiveDotColor={carouselGray}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={categorySliderRef}
            tappableDots={!!categorySliderRef}
          />
          <MoreLink to="/categories" />
          <Title text="人気のチャレンジ" />
          <Carousel
            ref={(c: any) => setChallengeSliderRef(c)}
            data={challenges}
            renderItem={_renderChallengeItem}
            sliderWidth={400}
            itemWidth={400}
            loop
            onSnapToItem={index => setChallengeActiveSlide(index)}
          />
          <Pagination
            dotsLength={challenges.length}
            activeDotIndex={challengeActiveSlide}
            containerStyle={{ paddingVertical: 0 }}
            dotColor="gray"
            dotStyle={{
              width: 8,
              height: 8,
              borderRadius: 4,
              marginHorizontal: 8,
              marginVertical: 8
            }}
            inactiveDotColor={carouselGray}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={challengeSliderRef}
            tappableDots={!!challengeSliderRef}
          />
          <MoreLink to="/challenges" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
