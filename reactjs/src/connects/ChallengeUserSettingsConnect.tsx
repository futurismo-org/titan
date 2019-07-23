import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { push } from 'connected-react-router';
import { getParticipantsUserId } from '~/lib/resource';
import { fetchUser } from '~/actions/userAction';
import { getUserDashboardPath } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchUser, push }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const profile = state.firebase.profile;
  const profileShortId = profile.shortId;

  const challengeId = props.challengeId || props.match.params.challengeId;
  const userShortId = props.userShortId || props.match.params.userShortId;
  const resourceId = getParticipantsUserId(challengeId, userShortId);
  const redirectPath = getUserDashboardPath(challengeId, userShortId);

  const isCurrentUser = profileShortId === userShortId;

  return {
    user: state.user.target,
    resourceId,
    isCurrentUser,
    redirectPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
