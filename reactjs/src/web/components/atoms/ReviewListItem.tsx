import React from 'react';
import { ListItem, ListItemText, Chip, Divider } from '@material-ui/core';
import NoStyledLink from './NoStyledLink';
import { REVIEW_TYPE_DAILY, REVIEW_TYPE_WEEKLY } from '~/constants/review';
import { formatYearDate } from '~/lib/moment';

const getColor = (type: string) => {
  if (type === REVIEW_TYPE_DAILY) {
    return 'default';
  } else if (type === REVIEW_TYPE_WEEKLY) {
    return 'primary';
  } else {
    return 'secondary';
  }
};

const ReviewListItem = (props: any) => {
  const { userReview, userShortId } = props;
  return (
    <React.Fragment>
      <NoStyledLink to={`/u/${userShortId}/reviews/${userReview.id}`}>
        <ListItem>
          <ListItemText>
            <Chip color={getColor(userReview.type)} label={userReview.type} />
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
  );
};

export default ReviewListItem;
