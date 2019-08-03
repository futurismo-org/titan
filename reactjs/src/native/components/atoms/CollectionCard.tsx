import * as React from 'react';
import {
  ImageProps,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform
} from 'react-native';
import { Text, H2, Card, CardItem } from 'native-base';
import styled from 'styled-components/native';
import { Link } from 'react-router-native';
import { human } from 'react-native-typography';
import { collectionURL, getRandomImageURL } from '~/lib/url';

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

const SlideInnerContainer = styled(TouchableOpacity)`
  width: itemWidth;
  height: slideHeight;
  padding-top: itemHorizontalMargin;
  padding-bottom: 18;
`;

const Shadow = styled(View)`
  position: absolute;
  top: 0;
  left: itemHorizontalMargin;
  right: itemHorizontalMargin;
  bottom: 18;
  shadowColor: black;
  shadowOpacity: 0.25;
  shadowOffset: { width: 0, height: 10 };
  shadowRadius: 10;
  borderRadius: entryBorderRadius;
`;

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
          <Card>
            <CardItem header>
              <H2 style={{ width: '100%' }}>
                センシティブな内容が含まれている可能性のあるコンテンツです
              </H2>
            </CardItem>
            <CardItem footer>
              <Text style={human.headline}>設定を変更</Text>
            </CardItem>
          </Card>
        </Link>
      ) : (
        <Link to={path}>
          <SlideInnerContainer activeOpacity={1}></SlideInnerContainer>
          <View />
        </Link>
        // <Link to={path}>
        //   <Card>
        //     <CardItem header>
        //       <Text style={{ width: '100%' } && human.title1}>
        //         {collection.title}
        //       </Text>
        //     </CardItem>
        //     {!small && (
        //       <CardItem cardBody>
        //         <StyledImage source={{ uri: getRandomImageURL() }} />
        //       </CardItem>
        //     )}
        //     <CardItem footer>
        //       <Text style={human.headline}>{collection.description}</Text>
        //     </CardItem>
        //   </Card>
        // </Link>
      )}
    </React.Fragment>
  );
};

export default CollectionCard;
