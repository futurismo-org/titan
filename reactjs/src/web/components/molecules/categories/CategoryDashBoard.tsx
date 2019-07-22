import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Grid, { GridProps } from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';

import Paper from 'web/components/templates/PaperWrapper';
import Title from 'web/components/atoms/Title';
// import TopicList from 'web/components/molecules/TopicList';

import DiscordHistories from 'web/components/atoms/DiscordHistories';
import MarkdownView from 'web/components/atoms/MarkdownView';

import shortId from 'shortid';
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
  const { category, challenges } = props;

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
          <CategoryChallenge challengeRefs={category.challengeRefs} />
        </StyledCardGrid>
        <Space />
        <Title text="トピック" />
        {/* <TopicList
          collection="categories"
          collectionId={category.id}
          limit={6}
        /> */}
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
