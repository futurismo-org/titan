import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchUsers } from '~/actions/userAction';
import { fetchProfiles } from '~/actions/profileAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers,
      fetchProfiles
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const users = state.user.items;
  const profiles = state.profile.items;

  const myId = state.firebase.profile.shortId;

  const marged =
    users && profiles
      ? users
          .filter((user: any) => !user.freezed)
          .map((user: any) => {
            const profile = profiles.filter(
              (profile: any) => profile.id === user.shortId
            );

            const totalScore =
              profile && profile.length === 1 ? profile[0].totalScore : 0;

            return {
              ...user,
              totalScore
            };
          })
      : [];

  return {
    users: marged,
    loading: state.user.loading || state.profile.loading,
    error: state.user.error || state.profile.error,
    myId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
