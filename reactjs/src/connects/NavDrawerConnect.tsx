import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { isLogin } from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const displayName = profile && profile.displayName;

  const photoURL =
    profile && profile.photoURL
      ? profile.photoURL
      : 'https://titan-fire.com/anonymous.png';

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
