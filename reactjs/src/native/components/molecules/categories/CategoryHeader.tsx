import * as React from 'react';
import { Content } from 'native-base';

import { Link } from 'react-router-native';
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
          <Link to={`/cat/${category.id}/dashboard`}>
            <Title>{category.title}</Title>
          </Link>
          <Description>{category.description}</Description>
        </Content>
      )}
    />
  );
};

export default CategoryHeader;
