import * as React from 'react';

import { Text } from 'native-base';
import { View, Image } from 'react-native';

import ParallaxScrollView from 'react-native-parallax-scroll-view';

import Header from '../molecules/categories/CategoryHeader';
import Body from '../molecules/categories/CategoryBody';

import Progress from '../atoms/CircularProgress';
import { getRandomImageURL } from '~/lib/url';

const Category = (props: any) => {
  const {
    category,
    loading,
    error,
    fetchCategory,
    resourceId,
    topics,
    fetchTopics,
    topicsResourceId,
    topicPath
  } = props;

  React.useEffect(() => {
    fetchCategory(resourceId);
    fetchTopics(topicsResourceId);
  }, [fetchCategory, fetchTopics, resourceId, topicsResourceId]);

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
      {loading && <Progress />}
      {category && (
        <ParallaxScrollView
          backgroundColor="#fff"
          parallaxHeaderHeight={300}
          renderBackground={() => (
            <Image
              source={{ uri: getRandomImageURL() }}
              style={{
                width: '100%',
                height: '100%'
              }}
            />
          )}
          renderFixedHeader={() => <Header category={category} />}
        >
          <View style={{ height: '100%' }}>
            <Body category={category} topics={topics} topicPath={topicPath} />
          </View>
        </ParallaxScrollView>
      )}
    </React.Fragment>
  );
};

export default Category;
