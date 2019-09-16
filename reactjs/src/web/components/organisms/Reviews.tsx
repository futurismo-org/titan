import React from 'react';
import { ListItem, ListItemText } from '@material-ui/core';
import Title from '~/web/components/atoms/Title';
import PostButton from '../atoms/PostButton';

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
    </React.Fragment>
  );
};

export default Reviews;
