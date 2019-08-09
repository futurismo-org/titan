import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchUserWithShortId } from '~/actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUserWithShortId
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.id;
  const user = state.user.target;
  const profile = state.firebase.profile;

  const isLogin = !profile.isEmpty && profile.isLoaded;
  const isMyProfile = profile.shortId === userShortId;

  return {
    user,
    loading: state.user.loading,
    error: state.user.error,
    userShortId,
    isLogin,
    isMyProfile,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
