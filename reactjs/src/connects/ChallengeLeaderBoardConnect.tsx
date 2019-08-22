import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipants } from '~/actions/participantAction';

import { fromNow } from '~/lib/moment';

import { rankChallengeParticipants } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers: fetchParticipants
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challengeId } = props;
  const resourceId = `/challenges/${challengeId}/participants`;
  const myId = state.firebase.profile.shortId;

  const users = rankChallengeParticipants(state.participant.items).map(
    (user: any) => {
      user.photoURL = user.photoURL || 'https://titan-fire.com/anonymous.png';
      user.latest = fromNow(user.updatedAt.toDate());
      user.profilePath = `/c/${challengeId}/u/${user.id}`;
      user.displayName = user.displayName || 'Anonymous';
      return user;
    }
  );

  return {
    users,
    loading: state.participant.loading,
    error: state.participant.error,
    myId,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
