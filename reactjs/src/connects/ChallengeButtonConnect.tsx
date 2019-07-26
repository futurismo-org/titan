import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipants, fetchUser } from '~/actions/userAction';

import { getParticipantsUserId, getParticipantsId } from '~/lib/resource';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants, fetchUser }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.challenge.id;
  const resourceId = getParticipantsId(challengeId);

  const profile = state.firebase.profile;
  const userShortId = profile.shortId;
  const userResourceId = getParticipantsUserId(challengeId, userShortId);

  const participants = state.user.items;

  const join =
    participants.filter((paritcipant: any) => paritcipant.id === userShortId)
      .length === 1;

  const participant = state.user.target;

  return {
    join,
    user: profile,
    participant,
    error: state.user.error,
    loading: state.user.loading,
    resourceId,
    userResourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);