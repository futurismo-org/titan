import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import Title from '~/web/components/atoms/Title';
import PostButton from '../atoms/PostButton';
import Progress from '../atoms/CircularProgress';

import Paper from '../templates/PaperWrapper';
import ReviewListItem from '../atoms/ReviewListItem';

const Reviews = (props: any) => {
  const {
    userShortId,
    dailyReviews,
    weeklyReviews,
    monthlyReviews,
    loading
  } = props;

  const RoutineReviews = (props: any) => {
    const { reviews, title } = props;

    if (reviews.length === 0) {
      return null;
    }

    return (
      <React.Fragment>
        <Paper>
          <h3>{title}</h3>
          {reviews.map((userReview: any) => (
            <ReviewListItem
              key={userReview.id}
              userReview={userReview}
              userShortId={userShortId}
            />
          ))}
        </Paper>
      </React.Fragment>
    );
  };

  return (
    <React.Fragment>
      <ListItem>
        <ListItemText>
          <Title text="レビュー" />
        </ListItemText>
        <PostButton
          to={`/u/${userShortId}/reviews/new`}
          type="button"
          text="レビューを新規投稿"
        />
      </ListItem>
      <React.Fragment>
        {loading && <Progress />}
        {!loading && (
          <React.Fragment>
            <RoutineReviews reviews={monthlyReviews} title="月次レビュー" />
            <br />
            <RoutineReviews reviews={weeklyReviews} title="週次レビュー" />
            <br />
            <RoutineReviews reviews={dailyReviews} title="日次レビュー" />
          </React.Fragment>
        )}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Reviews;
