import * as React from 'react';
import { Content } from 'native-base';
import HeaderImageScrollView, {
  TriggeringView
} from 'react-native-image-header-scroll-view';

import { Link } from 'react-router-native';
import { Title, Description } from '~/native/components/atoms/Hero';

// import Title from '~/native/components/atoms/Title';
import { getRandomImageURL } from '~/lib/url';

const CategoryHeader = (props: any) => {
  const { category } = props;

  return (
    <HeaderImageScrollView
      headerImage={{ uri: getRandomImageURL() }}
      renderForeground={() => (
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
