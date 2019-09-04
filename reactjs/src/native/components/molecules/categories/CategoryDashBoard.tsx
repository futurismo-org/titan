import * as React from 'react';

import { Text } from 'native-base';

import shortId from 'shortid';
import Title from '../../atoms/Title';
import MarkdownView from '../../atoms/MarkdownView';
import TopicList from '../TopicList';
import CategoryChallenge from './CategoryChallenge';

import MoreLink from '../../atoms/MoreLink';
import Flag from '~/native/containers/FlagContainer';
import { isiOS } from '~/native/lib/native';

const Space = (props: any) => <Text />;

const CategoryDashBoard = (props: any) => {
  const { category, topics, topicPath } = props;

  return (
    <React.Fragment>
      <Title text="概要" left />
      <MarkdownView text={category.overview} />
      <Flag category={category} />
      <Space />
      <Title text="チャレンジ一覧" left />
      {category.challengeRefs &&
        category.challengeRefs
          .slice(0, 4)
          .map((challengeRef: any) => (
            <CategoryChallenge
              key={shortId.generate()}
              challengeRef={challengeRef}
            />
          ))}
      <Space />
      <Title text="トピック" left />
      <TopicList topics={topics} topicPath={topicPath} limit={6} />
      <MoreLink to={`/cat/${category.id}/topics`} />
    </React.Fragment>
  );
};

export default CategoryDashBoard;
