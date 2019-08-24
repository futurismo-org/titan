import * as React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Text, Grid, Col, Row } from 'native-base';
import { withRouter } from 'react-router-native';
import { Image } from 'react-native-expo-image-cache';
import { getRandomImageURL, getChallengeUserGoalPath } from '~/lib/url';
import { previewImage } from '~/lib/theme';

import { isiOS } from '~/native/lib/native';
import UserAvatar from '~/native/components/atoms/UserAvatar';
import { formatDateShort } from '~/lib/moment';

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
export const itemWidth = slideWidth + itemHorizontalMargin * 2 - 20; //なぞの隙間

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
    // marginTop: 3,
    color: colors.gray,
    fontSize: 16,
    fontStyle: 'italic'
  }
});

const ChallengeGoalCard = (props: any) => {
  const { goal, challengeId, history } = props;
  const path = getChallengeUserGoalPath(challengeId, goal.id);

  const text = goal.what === '' ? '目標未設定' : goal.what;

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={[styles.slideInnerContainer, { height: slideHeight }]}
      onPress={() => history.replace(path)}
    >
      <View style={{ height: 60 }}>
        <Grid>
          <Col style={{ width: 60 }}>
            <UserAvatar photoURL={goal.photoURL} userId={goal.id} />
          </Col>
          <Col>
            <Row style={{ height: 35 }}>
              <Text style={styles.title}>{goal.displayName}</Text>
            </Row>
            <Row style={{ height: 25 }}>
              <Text style={styles.subtitle}>
                {`${goal.days}days, Joined at ${formatDateShort(
                  goal.createdAt && goal.createdAt.toDate()
                )}`}
              </Text>
            </Row>
          </Col>
        </Grid>
      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          preview={{ uri: previewImage }}
          uri={getRandomImageURL()}
        />
        <View style={styles.radiusMask} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default withRouter(ChallengeGoalCard);
