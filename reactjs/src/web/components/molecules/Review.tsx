import React from 'react';
import { Button, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import Progress from '../atoms/CircularProgress';
import Paper from '../templates/PaperWrapper';
import Title from '../atoms/Title';
import MarkdownView from '../atoms/MarkdownView';
import NoStyledLink from '../atoms/NoStyledLink';

import { remove } from '~/lib/firebase';
import CollectionCard from '../atoms/CollectionCard';
import ReviewListItem from '../atoms/ReviewListItem';
import theme from '~/lib/theme';

interface Props {
  container?: any;
  spacing?: number;
}

const StyledCardGrid = styled(Grid as React.SFC<Props>)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const Review = (props: any) => {
  const {
    userReview,
    loading,
    isCurrentUser,
    editReviewPath,
    history,
    resourceId,
    redirectPath,
    currentChallenges,
    currentReviews,
    userShortId
  } = props;

  const handleDelete = (redirectPath: string, resourceId: string) => {
    if (
      window.confirm('削除したデータは元に戻せません。本当に削除しますか？') // eslint-disable-line
    ) {
      remove(resourceId).then(() => history.push(redirectPath));
    }
  };

  return (
    <React.Fragment>
      {loading && <Progress />}
      {!loading && userReview && (
        <React.Fragment>
          <Paper>
            <Title text={userReview.title} />
            <br />
            <MarkdownView text={userReview.text} />
          </Paper>
        </React.Fragment>
      )}
      <br />
      {!loading && currentChallenges && currentChallenges.length !== 0 && (
        <React.Fragment>
          <h3>参加中のチャレンジ</h3>
          <StyledCardGrid container spacing={4}>
            {currentChallenges.map((item: any) => (
              <CollectionCard
                key={item.id}
                collection={item}
                type="challenges"
              />
            ))}
          </StyledCardGrid>
        </React.Fragment>
      )}
      <br />
      {!loading && currentReviews && currentReviews.length !== 0 && (
        <React.Fragment>
          <h3>過去のレビュー記録</h3>
          {currentReviews.map((item: any) => (
            <ReviewListItem
              key={item.id}
              userReview={item}
              userShortId={userShortId}
            />
          ))}
        </React.Fragment>
      )}
      {isCurrentUser ? (
        <div style={{ textAlign: 'center' }}>
          <p />
          <NoStyledLink to={editReviewPath}>
            <Button type="button" color="default" variant="contained">
              編集
            </Button>
          </NoStyledLink>
          <Button
            type="button"
            color="default"
            variant="contained"
            onClick={() => handleDelete(redirectPath, resourceId)}
          >
            削除
          </Button>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default withRouter(Review);
