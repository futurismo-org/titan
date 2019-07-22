import * as React from 'react';
import { Content } from 'native-base';

import {
  StyledHero as Hero,
  Title,
  Description
} from '~/native/components/atoms/Hero';

const CategoryHeader = (props: any) => {
  const { category } = props;

  return (
    <Hero
      source={{ uri: 'https://source.unsplash.com/random' }}
      renderOverlay={() => (
        <Content padder>
          <Title>{category.title}</Title>
          <Description>{category.description}</Description>
        </Content>
      )}
    />
  );
};

export default CategoryHeader;
