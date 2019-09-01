import * as React from 'react';
import { Content } from 'native-base';

import { TouchableOpacity } from 'react-native';
import { withRouter } from 'react-router-native';
import {
  StyledHero as Hero,
  Title,
  Description
} from '~/native/components/atoms/Hero';
import { getRandomImageURL } from '~/lib/url';

const CategoryHeader = (props: any) => {
  const { category, history } = props;

  return (
    <Hero
      source={{ uri: getRandomImageURL() }}
      renderOverlay={() => (
        <Content padder>
          <TouchableOpacity
            onPress={() => history.push(`/cat/${category.id}/dashboard`)}
          >
            <Title>{category.title}</Title>
          </TouchableOpacity>
          <Description>{category.description}</Description>
        </Content>
      )}
    />
  );
};

export default withRouter(CategoryHeader);
