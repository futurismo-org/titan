import * as React from 'react';
import { Content } from 'native-base';
import DefaultLayout from '~/native/components/templates/DefaultLayout';

const PaddingLayout = (props: any) => {
  return (
    <DefaultLayout>
      <Content padder>{props.children}</Content>
    </DefaultLayout>
  );
};

export default PaddingLayout;
