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

  const challengeId = props.challenge.id || props.match.params.challengeId;
  const userShortId = profileShortId || props.match.params.userShortId;
  const resourceId = getParticipantsUserId(challengeId, userShortId);
  const redirectPath = getUserDashboardPath(challengeId, userShortId);

  const isLogin = !profile.isEmpty && profile.isLoaded;

  return {
    user: state.user.target,
    resourceId,
    isLogin,
    redirectPath,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
