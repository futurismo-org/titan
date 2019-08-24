import { connect } from 'react-redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { compose } from 'redux';

const mapStateToProps = (state: any, props: any) => {
  const users = state.firestore.data.users;
  const profiles = state.firestore.data.profiles;
  const myId = state.firebase.profile.shortId;

  const marged =
    users && profiles
      ? Object.values(users)
          .filter((user: any) => !user.freezed)
          .map((user: any) => {
            const profile = Object.values(profiles).filter(
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

  return {
    users: marged,
    loading: !isLoaded(users) || !isLoaded(profiles),
    myId,
    ...props
  };
};

const query = (props: any) => {
  return [
    {
      collection: 'users'
    },
    {
      collection: 'profiles'
    }
  ];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(query)
) as any;
