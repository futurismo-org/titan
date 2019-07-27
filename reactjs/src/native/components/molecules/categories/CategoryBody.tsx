import * as React from 'react';
import { Content, Text } from 'native-base';

import shortId from 'shortid';
import Title from '../../atoms/Title';
import MarkdownView from '../../atoms/MarkdownView';

import CategoryChallenge from './CategoryChallenge';

const Space = (props: any) => <Text />;

const CategoryBody = (props: any) => {
  const { category } = props;
  return (
    <Content padder>
      <Title text="概要" />
      <MarkdownView text={category.overview} />
      <Space />
      <Title text="チャレンジ一覧" />
      {category.challengeRefs &&
        category.challengeRefs.map((challengeRef: any) => (
          <CategoryChallenge
            key={shortId.generate()}
            challengeRef={challengeRef}
          />
        ))}
      <Space />
      <Title text="トピック" />
    </Content>
  );
};

export default CategoryBody;
