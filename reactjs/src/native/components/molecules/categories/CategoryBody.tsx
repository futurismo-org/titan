import * as React from 'react';
import { Content, Card, CardItem } from 'native-base';

import shortId from 'shortid';
import Title from '../../atoms/Title';
import MarkdownView from '../../atoms/MarkdownView';

import CategoryChallenge from './CategoryChallenge';

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
        {category.challengeRefs &&
          category.challengeRefs.map((challengeRef: any) => (
            <CardItem key={shortId.generate()}>
              <CategoryChallenge
                key={shortId.generate()}
                challengeRef={challengeRef}
              />
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
