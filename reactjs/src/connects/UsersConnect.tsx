import { connect } from 'react-redux';
import { isLoaded, firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose, bindActionCreators, Dispatch } from 'redux';

import { fetchUsers } from '~/actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const users = state.user.items;
  const profiles = state.firestore.ordered.profiles;
  const myId = state.firebase.profile.shortId;

  const marged =
    !!users && isLoaded(profiles)
      ? users
          .filter((user: any) => !user.freezed)
          .map((user: any) => {
            const profile = profiles.filter(
              (profile: any) => profile.id === user.shortId
            );

            const totalScore =
              profile && profile.length === 1
                ? (profile as any[])[0].totalScore
                : 0;

            return {
              ...user,
              totalScore
            };
          })
          .slice(0, 20)
      : [];

  return {
    users: marged,
    isLoaded:
      isLoaded(profiles) && !isEmpty(profiles) && !state.profile.loading,
    myId,
    ...props
  };
};

const queries = (props: any) => {
  return [
    {
      collection: 'profiles'
    }
  ];
};

export default compose(
  firestoreConnect(queries),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
) as any;
