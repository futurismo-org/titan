import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { isLogin } from '~/lib/firebase';

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const userShortId = profile.shortId;

  const challenge = state.firestore.data.challenge;
  const participant = state.firestore.data.participant;

  return {
    challenge,
    isLogin: isLogin(state),
    userShortId,
    join: !isEmpty(participant),
    profile,
    loading: !(isLoaded(challenge) && isLoaded(participant)),
    ...props
  };
};

const query = (props: any) => {
  const challengeId = props.match.params.id;
  const userShortId = props.profile.shortId;

  return [
    {
      collection: 'challenges',
      doc: challengeId,
      storeAs: 'challenge'
    },
    {
      collection: 'challenges',
      doc: challengeId,
      storeAs: 'participant',
      subcollections: [
        {
          collection: 'participants',
          doc: userShortId
        }
      ]
    }
  ];
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(query)
) as any;
