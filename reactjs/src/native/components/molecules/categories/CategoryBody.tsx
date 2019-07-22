import * as React from 'react';
import { Content, Text, Card, CardItem } from 'native-base';

import Title from '../../atoms/Title';
import MarkdownView from '../../atoms/MarkdownView';

const CategoryBody = (props: any) => {
  const { category } = props;
  return (
    <Content padder>
      <Card>
        <CardItem header>
          <Title text="概要" />
        </CardItem>
        <CardItem>
          <MarkdownView text={category.overview} />
        </CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Title text="チャレンジ一覧" />
        </CardItem>
        <CardItem></CardItem>
      </Card>
      <Card>
        <CardItem header>
          <Title text="トピック" />
        </CardItem>
        <CardItem></CardItem>
      </Card>
    </Content>
  );
};

export default CategoryBody;
