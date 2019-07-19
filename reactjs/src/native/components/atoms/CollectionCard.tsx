import * as React from 'react';
import { Image, ImageProps } from 'react-native';
import { Text, H2, Card, CardItem, Right } from 'native-base';
import styled from 'styled-components';

const StyledImage = styled(Image)`
  height: 200px;
  width: null;
  flex: 1px;
` as React.ComponentType<ImageProps>;

const CollectionCard = (props: any) => {
  const { collection } = props;
  return (
    <Card>
      <CardItem header>
        <H2>{collection.title}</H2>
      </CardItem>
      <CardItem cardBody>
        <StyledImage source={{ uri: 'https://source.unsplash.com/random' }} />
      </CardItem>
      <CardItem footer>
        <Right>
          <Text>{collection.description}</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export default CollectionCard;
