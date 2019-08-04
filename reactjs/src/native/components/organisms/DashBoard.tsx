import React from 'react';
import { Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CollectionCard from '~/native/containers/CollectionCardContainer';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import MoreLink from '../atoms/MoreLink';

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

  const layout = 'stack';

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {!loading && (
        <React.Fragment>
          <Title text="運営からのおすすめ" />
          <Carousel
            data={pinned}
            renderItem={_renderChallengeItem}
            itemWidth={400}
            sliderWidth={400}
          />
          {/* <Pagination
            dotsLength={pinned.length}
            activeDotIndex={0}
            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
            dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: 'rgba(255, 255, 255, 0.92)'
            }}
            inactiveDotStyle={
              {
                // Define styles for inactive dots here
              }
            }
            inactiveDotOpacity={0.4}
            inactiveDotScale={0.6}
          /> */}
          <MoreLink to="/challenges" />
          <Title text="人気のカテゴリ" />
          <Carousel
            data={categories}
            renderItem={_renderCategoryItem}
            sliderWidth={400}
            itemWidth={400}
          />
          <MoreLink to="/categories" />
          <Title text="人気のチャレンジ" />
          <Carousel
            data={challenges}
            renderItem={_renderChallengeItem}
            sliderWidth={400}
            itemWidth={400}
          />
          <MoreLink to="/challenges" />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default DashBoard;
