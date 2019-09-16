import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import theme from '~/lib/theme';
import Reviews from '../../containers/ReviewsContainer';
import Review from '../../containers/ReviewContainer';
import ReviewForm from '../../containers/ReviewFormContainer';

const ReviewContent = styled.div`
  padding: ${theme.spacing(2)}px;
`;

const GeneralReviews = (props: any) => {
  return (
    <ReviewContent>
      <Switch>
        <Route
          path="/u/:id/reviews/:reviewId/edit"
          render={props => <ReviewForm {...props} />}
        />
        <Route
          path="/u/:id/reviews/new"
          render={props => <ReviewForm {...props} />}
        />
        <Route
          path="/u/:id/reviews/:reviewId"
          render={props => <Review {...props} />}
        />
        <Route path="/u/:id/reviews" render={props => <Reviews {...props} />} />
      </Switch>
    </ReviewContent>
  );
};

export default GeneralReviews;
