import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import moment from '~/lib/moment';

export const isChallengeOpening = (
  targetDate: Date,
  openedAt: Date,
  closedAt: Date
) =>
  moment(targetDate).diff(moment(openedAt)) >= 0 &&
  moment(targetDate).diff(moment(closedAt)) < 0;

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

  const profileChallenges = state.firestore.ordered.profileChallenges;
  const currentChallenges =
    isLoaded(profileChallenges) &&
    isLoaded(userReview) &&
    profileChallenges
      .filter((challenge: any) => {
        if (!challenge.openedAt) return false;
        if (!challenge.closedAt) return false;

        console.log(
          userReview.startedAt.toDate(),
          challenge.openedAt.toDate(),
          challenge.closedAt.toDate()
        );

        return isChallengeOpening(
          userReview.startedAt.toDate(),
          challenge.openedAt.toDate(),
          challenge.closedAt.toDate()
        );
      })
      .filter((challenge: any) => !challenge.freezed);

  return {
    userShortId,
    userReview,
    redirectPath,
    resourceId,
    isCurrentUser,
    editReviewPath,
    currentChallenges,
    loading: !isLoaded(userReview) || !isLoaded(profileChallenges),
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
