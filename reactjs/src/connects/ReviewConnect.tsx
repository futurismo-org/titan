import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import moment from '~/lib/moment';

export const isCurrentChallenge = (
  targetDate: Date,
  openedAt: Date,
  closedAt: Date
) =>
  moment(targetDate).diff(moment(openedAt)) >= 0 &&
  moment(targetDate).diff(moment(closedAt)) < 0;

export const isCurrentReview = (
  targetDate: Date,
  startedAt: Date,
  endedAt: Date
) =>
  moment(targetDate).diff(moment(startedAt)) >= 0 &&
  moment(targetDate).diff(moment(endedAt)) < 0;

const mapStateToProps = (state: any, props: any) => {
  const userReview = state.firestore.data.userReview;
  const userReviews = state.firestore.ordered.userReviews;
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

  const profileChallenges = state.firestore.ordered.profileChallenges;
  const currentChallenges =
    isLoaded(profileChallenges) &&
    isLoaded(userReview) &&
    profileChallenges
      .filter((challenge: any) => {
        if (!challenge.openedAt) return false;
        if (!challenge.closedAt) return false;

        return isCurrentChallenge(
          userReview.startedAt.toDate(),
          challenge.openedAt.toDate(),
          challenge.closedAt.toDate()
        );
      })
      .filter((challenge: any) => !challenge.freezed);

  const currentReviews =
    isLoaded(userReviews) &&
    isLoaded(userReview) &&
    userReviews.filter((review: any) => {
      return isCurrentReview(
        review.endedAt.toDate(),
        userReview.startedAt.toDate(),
        userReview.endedAt.toDate()
      );
    });

  return {
    userShortId,
    userReview,
    redirectPath,
    resourceId,
    isCurrentUser,
    editReviewPath,
    currentChallenges,
    currentReviews,
    loading:
      !isLoaded(userReview) ||
      !isLoaded(profileChallenges) ||
      !isLoaded(userReviews),
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
      storeAs: 'userReviews',
      subcollections: [
        {
          collection: 'posts'
        }
      ]
    },
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
    },
    {
      collection: 'profiles',
      doc: userShortId,
      storeAs: 'profileChallenges',
      subcollections: [{ collection: 'challenges' }]
    }
  ];

  return query;
};

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;
