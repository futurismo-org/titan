import * as React from 'react';
import { Text, Content } from 'native-base';
import styled from 'styled-components';

import Hero from 'react-native-hero';

const StyledHero = styled(Hero)`
  position: absolute;
`;

const CategoryHeader = (props: any) => {
  const { category } = props;

  return (
    <StyledHero
      source={{ uri: 'https://source.unsplash.com/random' }}
      renderOverlay={() => (
        <Content padder>
          <Text style={{ fontSize: 48, color: '#fff', fontWeight: 'bold' }}>
            {category.title}
          </Text>
          <Text style={{ fontSize: 24, color: '#fff' }}>
            {category.description}
          </Text>
        </Content>
      )}
    />
  );
};

export default CategoryHeader;
