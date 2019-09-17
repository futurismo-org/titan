import React from 'react';
import { ListItem, ListItemText, Divider, Chip } from '@material-ui/core';
import Title from '~/web/components/atoms/Title';
import PostButton from '../atoms/PostButton';
import Progress from '../atoms/CircularProgress';
import NoStyledLink from '../atoms/NoStyledLink';
import { formatYearDate } from '~/lib/moment';
import { REVIEW_TYPE_DAILY, REVIEW_TYPE_WEEKLY } from '~/constants/review';

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
  const { userShortId, userReviews, loading } = props;

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
      <Divider />
      <React.Fragment>
        {loading && <Progress />}
        {!loading &&
          userReviews &&
          userReviews.map((userReview: any) => (
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
      </React.Fragment>
    </React.Fragment>
  );
};

export default Reviews;
