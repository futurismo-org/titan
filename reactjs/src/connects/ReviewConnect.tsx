import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapStateToProps = (state: any, props: any) => {
  const userReview = state.firestore.ordered.userReview;
  const userShortId = props.match.params.id;

  return {
    userShortId,
    userReview,
    loading: !isLoaded(userReview),
    ...props
  };
};

const queries = (props: any) => {
  const userShortId = props.match.params.id;
  const reviewId = props.match.params.reviewId;

  const query = [
    {
      collection: 'reviews',
      doc: userShortId,
      storeAs: 'userReview',
      subcollections: [
        {
          collection: 'posts',
          doc: reviewId
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
