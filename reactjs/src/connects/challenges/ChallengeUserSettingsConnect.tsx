import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getParticipantId } from '~/lib/resource';
import { fetchUser } from '~/actions/userAction';
import { getChallengeDashboardPath } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchUser }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const profileShortId = profile.shortId;

  const challengeId = props.challengeId || props.match.params.id;
  const userShortId = profileShortId;
  const resourceId = getParticipantId(challengeId, userShortId);
  const redirectPath = getChallengeDashboardPath(challengeId, userShortId);

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
