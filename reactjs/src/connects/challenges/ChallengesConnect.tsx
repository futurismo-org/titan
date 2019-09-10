import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import moment from '~/lib/moment';
import { isChallengeOpening, isChallengeClosed } from '~/lib/challenge';

const mapStateToProps = (state: any, props: any) => {
  const items = state.firestore.data.challenges;
  const challenges = isLoaded(items)
    ? Object.values(items).filter((item: any) => !item.freezed && !item.draft)
    : [];

  const preOpenChallenges = challenges.filter((challenge: any) =>
    moment(new Date().setHours(0, 0, 0, 0)).isBefore(
      challenge.openedAt.toDate()
    )
  );
  const openingChallenges = challenges.filter((challenge: any) =>
    isChallengeOpening(challenge.openedAt.toDate(), challenge.closedAt.toDate())
  );
  const closedChallenges = challenges.filter((challenge: any) =>
    isChallengeClosed(challenge.closedAt.toDate())
  );

  return {
    challenges,
    preOpenChallenges,
    openingChallenges,
    closedChallenges,
    ...props
  };
};

const queries = (props: any) => [
  {
    collection: 'challenges',
    orderByKey: ['updatedAt', 'desc']
  }
];

export default compose(
  firestoreConnect(queries),
  connect(mapStateToProps)
) as any;
