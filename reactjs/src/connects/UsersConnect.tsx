import { connect } from 'react-redux';
import { isLoaded, firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';

const mapStateToProps = (state: any, props: any) => {
  const users = state.firestore.ordered.myUsers;
  const profiles = state.firestore.ordered.myProfiles;
  const myId = state.firebase.profile.shortId;

  const marged = isLoaded(users, profiles)
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
    : [];

  console.log(marged, isLoaded(users));

  return {
    users: marged,
    isLoaded: isLoaded(users, profiles) && !isEmpty(users, profiles),
    myId
  };
};

const queries = (props: any) => {
  return [
    {
      collection: 'users',
      storeAs: 'myUsers'
    },
    {
      collection: 'profiles',
      storeAs: 'myProfiles'
    }
  ];
};

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;
