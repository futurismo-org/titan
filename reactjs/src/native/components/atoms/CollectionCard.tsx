import * as React from 'react';
import { Image, ImageProps } from 'react-native';
import { Text, H2, Card, CardItem } from 'native-base';
import styled from 'styled-components';
import { Link } from 'react-router-native';
import { human } from 'react-native-typography';
import { collectionURL, getRandomImageURL } from '~/lib/url';

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
          <Card>
            <CardItem header>
              <Text style={{ width: '100%' } && human.title1}>
                {collection.title}
              </Text>
            </CardItem>
            {!small && (
              <CardItem cardBody>
                <StyledImage source={{ uri: getRandomImageURL() }} />
              </CardItem>
            )}
            <CardItem footer>
              <Text style={human.headline}>{collection.description}</Text>
            </CardItem>
          </Card>
        </Link>
      )}
    </React.Fragment>
  );
};

export default CollectionCard;
