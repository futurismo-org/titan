import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import {
  REVIEW_TYPE_DAILY,
  REVIEW_TYPE_WEEKLY,
  REVIEW_TYPE_MONTHLY
} from '../constants/review';

const mapStateToProps = (state: any, props: any) => {
  const userReviews = state.firestore.ordered.userReviews;
  const userShortId = props.match.params.id;

  const dailyReviews =
    isLoaded(userReviews) &&
    userReviews.filter((review: any) => review.type === REVIEW_TYPE_DAILY);

  const weeklyReviews =
    isLoaded(userReviews) &&
    userReviews.filter((review: any) => review.type === REVIEW_TYPE_WEEKLY);

  const monthlyReviews =
    isLoaded(userReviews) &&
    userReviews.filter((review: any) => review.type === REVIEW_TYPE_MONTHLY);

  return {
    userShortId,
    dailyReviews,
    weeklyReviews,
    monthlyReviews,
    loading: !isLoaded(userReviews),
    ...props
  };
};

const queries = (props: any) => {
  const userShortId = props.match.params.id;

  const query = [
    {
      collection: 'reviews',
      doc: userShortId,
      storeAs: 'userReviews',
      subcollections: [
        {
          collection: 'posts'
        }
      ]
    }
  ];

  return query;
};

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;
