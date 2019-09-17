import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

const mapStateToProps = (state: any, props: any) => {
  const userReview = state.firestore.data.userReview;
  const userShortId = props.match.params.id;

  const redirectPath = `/u/${userShortId}/reviews`;
  const resourceId =
    isLoaded(userReview) &&
    userReview &&
    `/reviews/${userShortId}/posts/${userReview.id}`;
  const editReviewPath =
    isLoaded(userReview) &&
    userReview &&
    `/u/${userShortId}/reviews/${userReview.id}/edit`;

  const currentUser = state.firebase.profile;
  const isCurrentUser =
    isLoaded(userReview) &&
    userReview &&
    currentUser &&
    userReview.userId === currentUser.shortId;

  return {
    userShortId,
    userReview,
    redirectPath,
    resourceId,
    isCurrentUser,
    editReviewPath,
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
