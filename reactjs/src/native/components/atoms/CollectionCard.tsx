import * as React from 'react';
import { H2 } from 'native-base';

const CollectionCard = (props: any) => {
  const { collection } = props;
  return <H2>{collection.title}</H2>;
};

export default CollectionCard;
