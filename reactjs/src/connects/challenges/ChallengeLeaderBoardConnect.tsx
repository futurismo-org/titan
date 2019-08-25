import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipants } from '~/actions/participantAction';

import { fromNow } from '~/lib/moment';

import { rankChallengeParticipants } from '~/lib/challenge';
import { ANONYMOUS_AVATAR_URL } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchParticipants
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challengeId } = props;
  const resourceId = `/challenges/${challengeId}/participants`;
  const myId = state.firebase.profile.shortId;

  const users = rankChallengeParticipants(state.participant.items).map(
    (user: any) => {
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
    }
  );

  return {
    users,
    loading: state.participant.loading,
    myId,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
