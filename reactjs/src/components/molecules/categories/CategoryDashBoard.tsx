import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import shortid from 'shortid';
import { Link } from 'react-router-dom';

import Paper from '../../templates/PaperWrapper';
import Title from '../../atoms/Title';
import TopicList from '../TopicList';

import ChallengeCategory from './CategoryChallenge';
import DiscordHistories from '../../atoms/DiscordHistories';
import MarkdownView from '../../atoms/MarkdownView';

const MoreLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
    text-align: right;
  }
`;

const CategoryDashBoard = (props: any) => {
  const { category } = props;

  return (
    <React.Fragment>
      <Paper>
        <Title text="概要" />
        <MarkdownView text={category.overview} />
      </Paper>
      <Paper>
        <Title text="チャレンジ一覧" />
        {category.challengeRefs &&
          category.challengeRefs.map((challengeRef: any) => (
            <ChallengeCategory
              key={shortid.generate()}
              challengeRef={challengeRef}
            />
          ))}
      </Paper>
      <Paper>
        <Title text="トピック" />
        <TopicList
          collection="categories"
          collectionId={category.id}
          limit={6}
        />
        <MoreLink to={`/cat/${category.id}/topics`}>
          <Typography variant="subtitle1" color="primary">
            もっと見る
          </Typography>
        </MoreLink>
      </Paper>
      <Paper>
        <Title text="フリートーク" />
        <DiscordHistories channelId={category.channelId} limit={30} />
      </Paper>
    </React.Fragment>
  );
};

export default CategoryDashBoard;
