import * as React from 'react';

import { Text } from 'native-base';

import shortId from 'shortid';
import Title from '../../atoms/Title';
import MarkdownView from '../../atoms/MarkdownView';
import TopicList from '../TopicList';
import CategoryChallenge from './CategoryChallenge';

import MoreLink from '../../atoms/MoreLink';

const Space = (props: any) => <Text />;

const CategoryDashBoard = (props: any) => {
  const { category, topics, topicPath } = props;

  return (
    <React.Fragment>
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
      <TopicList topics={topics} topicPath={topicPath} limit={6} />
      <MoreLink to={`/cat/${category.id}/topics`} />
    </React.Fragment>
  );
};

export default CategoryDashBoard;
