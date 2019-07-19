import * as React from 'react';
import { Text, H2, Card, CardItem, Right } from 'native-base';

const CollectionCard = (props: any) => {
  const { collection } = props;
  return (
    <Card>
      <CardItem header>
        <H2>{collection.title}</H2>
      </CardItem>
      <CardItem header>
        <Text>{collection.description}</Text>
      </CardItem>
      <CardItem footer button>
        <Right>
          <Text>もっと見る...</Text>
        </Right>
      </CardItem>
    </Card>
  );
};

export default CollectionCard;
