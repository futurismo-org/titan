import * as React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image as NativeImage
} from 'react-native';
import { Image } from 'react-native-expo-image-cache';
import { Text } from 'native-base';
import { withRouter } from 'react-router-native';
import { getRandomImageURL } from '~/lib/url';

import { isiOS } from '~/native/lib/native';
import { isHideSensitive } from '~/lib/challenge';
import { previewImage } from '~/lib/theme';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
);

function wp(percentage: number) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.4;
const slideWidth = wp(90);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const entryBorderRadius = 8;

const colors = {
  black: '#1a1917',
  gray: '#888888'
};

const styles = StyleSheet.create({
  slideInnerContainer: {
    width: itemWidth,
    // height: slideHeight,
    // paddingHorizontal: itemHorizontalMargin,
    paddingBottom: 18, // needed for shadow
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: entryBorderRadius
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
  textContainer: {
    justifyContent: 'center',
    paddingTop: 16 - entryBorderRadius,
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
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    lineHeight: 30
  },
  subtitle: {
    marginTop: 3,
    color: colors.gray,
    fontSize: 16,
    fontStyle: 'italic'
  }
});

const ProfileCategoryCard = (props: any) => {
  const { category, allowSensitive, debugSensitive, path, history } = props;

  return (
    <React.Fragment>
      {isHideSensitive(debugSensitive, category.sensitive, allowSensitive) ? (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.slideInnerContainer, { height: slideHeight }]}
          onPress={() => history.replace('/settings')}
        >
          <View style={styles.shadow} />
          <View style={styles.imageContainer}>
            <NativeImage
              source={{
                uri: 'https://titan-fire.com/images/icons/icon-144x144.png'
              }}
              style={{
                flex: 1,
                flexDirection: 'row',
                alignSelf: 'center',
                resizeMode: 'contain',
                width: 144,
                height: 144
              }}
            />
            <View style={styles.radiusMask} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>
              センシティブな内容が含まれている可能性のあるコンテンツです
            </Text>
            <Text style={styles.subtitle}>設定を変更</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.slideInnerContainer, { height: slideHeight }]}
          onPress={() => history.replace(path)}
        >
          <View style={styles.shadow} />
          <View style={styles.imageContainer}>
            <Image
              uri={getRandomImageURL()}
              style={styles.image}
              preview={{ uri: previewImage }}
            />
            <View style={styles.radiusMask} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title} numberOfLines={2}>
              {category.title}
            </Text>
            <Text style={styles.subtitle} numberOfLines={2}>
              {category.description}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    </React.Fragment>
  );
};

export default withRouter(ProfileCategoryCard);
