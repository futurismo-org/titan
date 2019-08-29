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
    loading: !(isLoaded(challenge) && participant
      ? isLoaded(participant)
      : true)
  };
};

const queries = (props: any) => {
  const challengeId = props.match.params.id;
  const userShortId = props.profile.shortId;

  const array = [
    {
      collection: 'challenges',
      doc: challengeId,
      storeAs: 'challenge'
    }
  ];

  const sub = {
    collection: 'challenges',
    doc: challengeId,
    storeAs: 'participant',
    subcollections: [
      {
        collection: 'participants',
        doc: userShortId
      }
    ]
  };

  if (userShortId) {
    array.push(sub);
  }

  return array;
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect(queries)
) as any;
