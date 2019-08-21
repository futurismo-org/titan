import React, { useState } from 'react';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { View } from 'react-native';
import CollectionCard from '~/native/containers/CollectionCardContainer';
import Title from '../atoms/Title';
import MoreLink from '../atoms/MoreLink';
import { brandGray } from '~/lib/theme';
import Error from '~/native/components/atoms/Error';
import { deviceWidth } from '~/native/lib/native';
import Progress from '~/native/components/atoms/CircularProgress';

const DashBoard = (props: any) => {
  const {
    challenges,
    categories,
    loading,
    error,
    fetchChallenges,
    fetchCategories
  } = props;

  const [categoryActiveSlide, setCategoryActiveSlide] = useState(0);
  const [categorySliderRef, setCategorySliderRef] = useState(undefined);
  const [challengeActiveSlide, setChallengeActiveSlide] = useState(0);
  const [challengeSliderRef, setChallengeSliderRef] = useState(undefined);

  React.useEffect(() => {
    fetchChallenges(6);
    fetchCategories(6);
  }, [fetchCategories, fetchChallenges]);

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
      {error && <Error error={error} />}
      {loading && <Progress />}
      {!loading && (
        <View>
          <Title text="オススメのチャレンジ" />
          <Carousel
            ref={(c: any) => setChallengeSliderRef(c)}
            data={challenges}
            renderItem={_renderChallengeItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
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
            inactiveDotColor={brandGray}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={challengeSliderRef}
            tappableDots={!!challengeSliderRef}
          />
          <MoreLink to="/challenges" />
          <Title text="人気のカテゴリ" />
          <Carousel
            ref={(c: any) => setCategorySliderRef(c)}
            data={categories}
            renderItem={_renderCategoryItem}
            sliderWidth={deviceWidth}
            itemWidth={deviceWidth}
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
            inactiveDotColor={brandGray}
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
            carouselRef={categorySliderRef}
            tappableDots={!!categorySliderRef}
          />
          <MoreLink to="/categories" />
        </View>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
