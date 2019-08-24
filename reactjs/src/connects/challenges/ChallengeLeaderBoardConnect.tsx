import { connect } from 'react-redux';

import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { fromNow } from '~/lib/moment';

import { rankChallengeParticipants } from '~/lib/challenge';
import { ANONYMOUS_AVATAR_URL } from '~/lib/url';

const mapStateToProps = (state: any, props: any) => {
  const { challengeId } = props;
  const myId = state.firebase.profile.shortId;

  const participants = state.firestore.ordered.participants;

  const users =
    isLoaded(participants) &&
    !isEmpty(participants) &&
    rankChallengeParticipants(participants).map((user: any) => {
      user.photoURL = user.photoURL || ANONYMOUS_AVATAR_URL;
      user.latest =
        user.histories.length !== 0
          ? fromNow(
              user.histories[user.histories.length - 1].timestamp.toDate()
            )
          : '-';
      user.profilePath = `/c/${challengeId}/u/${user.id}`;
      user.displayName = user.displayName || 'Anonymous';
      return user;
    });

  return {
    users,
    isLoaded: isLoaded(participants),
    myId,
    ...props
  };
};

const queries = (props: any) => {
  const { challengeId } = props;

  return [
    {
      collection: 'challenges',
      doc: challengeId,
      storeAs: 'participants',
      subcollections: [
        {
          collection: 'participants'
        }
      ]
    }
  ];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(queries)
) as any;
