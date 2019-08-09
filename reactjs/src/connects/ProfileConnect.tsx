import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchUserWithShortId } from '~/actions/userAction';
import { fetchBlockingUsers } from '~/actions/blockAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUserWithShortId,
      fetchBlockingUsers
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.id;
  const user = state.user.target;
  const profile = state.firebase.profile;

  const isLogin = !profile.isEmpty && profile.isLoaded;
  const isMyProfile = profile.shortId === userShortId;

  const myUserId = profile.shortId;

  const blockingUsers = state.block.items;
  const blockedUserIds = blockingUsers.map((item: any) => item.blockedUserId);
  const blocked = blockedUserIds.includes(myUserId);

  return {
    user,
    loading: state.user.loading,
    error: state.user.error,
    userShortId,
    isLogin,
    isMyProfile,
    myUserId,
    blocked,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
