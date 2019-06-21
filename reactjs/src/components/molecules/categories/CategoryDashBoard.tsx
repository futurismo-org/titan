import * as React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import { ulid } from 'ulid';
import { Link } from 'react-router-dom';
import theme from '../../../lib/theme';

import ChallengeCategory from './CategoryChallenge';
import DiscordHistories from '../../atoms/DiscordHistories';

const Title = (props: any) => (
  <Typography component="h3" variant="h4">
    {props.text}
  </Typography>
);

const StyledPaper = styled(Paper)`
  && {
    margin: ${theme.spacing(0)}px;
    padding: ${theme.spacing(3)}px;
  }
` as React.ComponentType<PaperProps>;

const OverviewContent = styled.div`
  white-space: pre-line;
  margin: 10px;
`;

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
      <StyledPaper>
        <Title text="概要" />
        <OverviewContent>{category.overview}</OverviewContent>
      </StyledPaper>
      <StyledPaper>
        <Title text="チャレンジ一覧" />
        {category.challengeRefs &&
          category.challengeRefs.map((challengeRef: any) => (
            <ChallengeCategory key={ulid()} challengeRef={challengeRef} />
          ))}
      </StyledPaper>
      <StyledPaper>
        <Title text="知見まとめ" />
        <MoreLink to={`/categories/${category.id}/discussions`}>
          <Typography variant="subtitle1" color="primary">
            もっと見る
          </Typography>
        </MoreLink>
      </StyledPaper>
      <StyledPaper>
        <Title text="Discordフリートーク" />
        <DiscordHistories channelId={category.channelId} limit={30} />
      </StyledPaper>
    </React.Fragment>
  );
};

export default CategoryDashBoard;
