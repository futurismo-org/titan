import React from 'react';
import { ListItem, ListItemText, Divider, Chip } from '@material-ui/core';
import Title from '~/web/components/atoms/Title';
import PostButton from '../atoms/PostButton';
import Progress from '../atoms/CircularProgress';
import NoStyledLink from '../atoms/NoStyledLink';
import { formatYearDate } from '~/lib/moment';
import { REVIEW_TYPE_DAILY, REVIEW_TYPE_WEEKLY } from '~/constants/review';

import Paper from '../templates/PaperWrapper';

const getColor = (type: string) => {
  if (type === REVIEW_TYPE_DAILY) {
    return 'default';
  } else if (type === REVIEW_TYPE_WEEKLY) {
    return 'primary';
  } else {
    return 'secondary';
  }
};

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
            <React.Fragment key={userReview.id}>
              <NoStyledLink to={`/u/${userShortId}/reviews/${userReview.id}`}>
                <ListItem>
                  <ListItemText>
                    <Chip
                      color={getColor(userReview.type)}
                      label={userReview.type}
                    />
                    {`   ${formatYearDate(userReview.startedAt.toDate())} ${
                      userReview.type !== REVIEW_TYPE_DAILY
                        ? ` - ${formatYearDate(userReview.endedAt.toDate())}`
                        : ''
                    }`}
                  </ListItemText>
                </ListItem>
              </NoStyledLink>
              <Divider />
            </React.Fragment>
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
