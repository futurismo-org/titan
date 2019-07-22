import * as React from 'react';
import { Content, Text, Card, CardItem } from 'native-base';

import Title from '../../atoms/Title';
import MarkdownView from '../../atoms/MarkdownView';
import CollectionCard from '../../atoms/CollectionCard';

const CategoryBody = (props: any) => {
  const { category, challenges } = props;
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
        {challenges.map((challenge: any) => (
          <CardItem key={challenge.id}>
            <CollectionCard collection={challenge} type="challenges" small />
          </CardItem>
        ))}
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
