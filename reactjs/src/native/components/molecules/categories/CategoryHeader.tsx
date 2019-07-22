import * as React from 'react';
import { Text } from 'native-base';

import Hero from 'react-native-hero';

const CategoryHeader = (props: any) => {
  const { category } = props;

  return (
    <Hero
      source={{ uri: 'https://source.unsplash.com/random' }}
      renderOverlay={() => (
        <React.Fragment>
          <Text>{category.title}</Text>
          <Text>{category.description}</Text>
        </React.Fragment>
      )}
    />
  );
};

export default CategoryHeader;
