import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isLogin } from '~/lib/firebase';
import { ANONYMOUS_AVATAR_URL } from '~/lib/url';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const displayName = profile && profile.displayName;

  const photoURL =
    profile && profile.photoURL ? profile.photoURL : ANONYMOUS_AVATAR_URL;

  return {
    isLogin: isLogin(state),
    isAdmin: profile && profile.isAdmin,
    displayName,
    photoURL,
    userId: profile && profile.shortId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
