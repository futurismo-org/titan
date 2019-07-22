import * as React from 'react';
import { Image, ImageProps } from 'react-native';
import { Text, H2, Card, CardItem } from 'native-base';
import styled from 'styled-components';
import { Link } from 'react-router-native';
import { collectionURL } from '~/lib/url';

const StyledImage = styled(Image)`
  height: 200px;
  width: null;
  flex: 1px;
` as React.ComponentType<ImageProps>;

const CollectionCard = (props: any) => {
  const { collection, type } = props;

  return (
    <Link to={collectionURL(type, collection.id)}>
      <Card>
        <CardItem header>
          <H2>{collection.title}</H2>
        </CardItem>
        <CardItem cardBody>
          <StyledImage source={{ uri: 'https://source.unsplash.com/random' }} />
        </CardItem>
        <CardItem footer>
          <Text>{collection.description}</Text>
        </CardItem>
      </Card>
    </Link>
  );
};

export default CollectionCard;
