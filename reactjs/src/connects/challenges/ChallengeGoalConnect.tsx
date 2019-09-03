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
  const challengeId = props.match.params.id;
  const userShortId = props.match.params.userShortId;

  const user = state.user.target;

  const profile = state.firebase.profile;
  const isMyProfile = profile.shortId === userShortId;

  return {
    user,
    challengeId,
    userShortId,
    isMyProfile,
    loading: state.user.loading,
    error: state.user.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
