import * as React from 'react';
import {
  ImageProps,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { Text } from 'native-base';
import styled from 'styled-components/native';
import { Link } from 'react-router-native';
import { collectionURL, getRandomImageURL } from '~/lib/url';

import { isiOS } from '~/lib/native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const colors = {
  black: '#1a1917',
  gray: '#888888',
  background1: '#B721FF',
  background2: '#21D4FD'
};

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18 // needed for shadow
  },
  shadow: {
    position: 'absolute',
    top: 0,
    left: itemHorizontalMargin,
    right: itemHorizontalMargin,
    bottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 10,
    borderRadius: entryBorderRadius
  },
  imageContainer: {
    flex: 1,
    marginBottom: isiOS ? 0 : -1, // Prevent a random Android rendering issue
    backgroundColor: 'white',
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.black
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: isiOS ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
  },
  // image's border radius is buggy on iOS; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    color: colors.black,
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    marginTop: 6,
    color: colors.gray,
    fontSize: 12,
    fontStyle: 'italic'
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  }
});

const StyledImage = styled(Image)`
  height: 200px;
  width: null;
  flex: 1px;
` as React.ComponentType<ImageProps>;

const CollectionCard = (props: any) => {
  const { collection, type, small, allowSensitive } = props;

  const path = collectionURL(type, collection.id);

  return (
    <React.Fragment>
      {collection.sensitive && !allowSensitive ? (
        <Link to="/settings">
          <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}
          >
            <View style={styles.shadow} />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                センシティブな内容が含まれている可能性のあるコンテンツです
              </Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                設定を変更
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      ) : (
        <Link to={path}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.slideInnerContainer}
          >
            <View style={styles.shadow} />
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: getRandomImageURL() }}
                style={styles.image}
              />
              <View style={styles.radiusMask} />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={2}>
                {collection.title}
              </Text>
              <Text style={styles.subtitle} numberOfLines={2}>
                {collection.description}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      )}
    </React.Fragment>
  );
};

export default CollectionCard;
