import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const isLogin = !profile.isEmpty && profile.isLoaded;
  const { displayName } = profile;
  const photoURL = profile.photoURL
    ? profile.photoURL
    : 'https://titan-fire.com/anonymous.png';

  return {
    isLogin,
    displayName,
    photoURL,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
