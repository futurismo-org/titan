import * as React from 'react';
import { Content } from 'native-base';
import DefaultLayout from '~/native/components/templates/DefaultLayout';

const HeroLayout = (props: any) => {
  return (
    <DefaultLayout>
      <Content>{props.children}</Content>
    </DefaultLayout>
  );
};

export default HeroLayout;
