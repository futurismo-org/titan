import * as React from 'react';
import Grid, { GridProps } from '@material-ui/core/Grid';

import { Typography } from '@material-ui/core';

import shortId from 'shortid';
import { Link } from 'react-router-dom';

import Paper from 'web/components/templates/PaperWrapper';
import Title from 'web/components/atoms/Title';

import DiscordHistories from 'web/components/atoms/DiscordHistories';
import MarkdownView from 'web/components/atoms/MarkdownView';
import styled from 'styled-components';
import TopicList from '~/web/components/molecules/TopicList';
import theme from '~/lib/theme';

import CategoryChallenge from './CategoryChallenge';

const MoreLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
    text-align: right;
  }
`;

const Space = () => (
  <React.Fragment>
    <br />
    <br />
  </React.Fragment>
);

const StyledCardGrid = styled(Grid)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
` as React.ComponentType<GridProps>;

const CategoryDashBoard = (props: any) => {
  const { category, topics, topicPath } = props;

  console.log(category);

  return (
    <React.Fragment>
      <Paper>
        <Title text="概要" />
        <MarkdownView text={category.overview} />
        <Space />
        <Title text="チャレンジ一覧" />
        <StyledCardGrid container spacing={4}>
          {category.challengeRefs.map((challengeRef: any) => (
            <CategoryChallenge
              key={shortId.generate()}
              challengeRef={challengeRef}
            />
          ))}
        </StyledCardGrid>
        <Space />
        <Title text="トピック" />
        <TopicList topics={topics} topicPath={topicPath} limit={6} />
        <MoreLink to={`/cat/${category.id}/topics`}>
          <Typography variant="subtitle1" color="primary">
            もっと見る
          </Typography>
        </MoreLink>
        <Space />
        <Title text="フリートーク" />
        <DiscordHistories channelId={category.channelId} limit={30} />
      </Paper>
    </React.Fragment>
  );
};

export default CategoryDashBoard;
