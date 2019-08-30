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
  const timelineId = `${userShortId}_${challengeId}`;

  const user = state.user.target;

  const profile = state.firebase.profile;
  const isMyProfile = profile.shortId === userShortId;

  return {
    user,
    userShortId,
    timelineId,
    isMyProfile,
    loading: state.user.loading,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
