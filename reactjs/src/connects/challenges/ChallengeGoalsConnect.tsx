import { connect } from 'react-redux';

import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { compose, bindActionCreators, Dispatch } from 'redux';
import moment from '~/lib/moment';

import { fetchChallengeObjectives } from '~/actions/objectiveAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallengeObjectives
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const userShortId = state.firebase.profile.shortId;
  const participants = state.firestore.ordered.participants;
  const objectives = state.objective.items;

  const goals =
    isLoaded(participants) &&
    !isEmpty(participants) &&
    !!objectives &&
    objectives
      .map((objective: any) => {
        const user = participants.find(
          (participant: any) => objective.userShortId === participant.id
        );

        return {
          id: user.id,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: user.createdAt,
          days: user.days || 0,
          what: objective && objective.what ? objective.what : '',
          why: objective && objective.why ? objective.why : '',
          updatedAt: user.updatedAt
        };
      })
      .sort((x: any, y: any) =>
        moment(y.updatedAt.toDate()).diff(moment(x.updatedAt.toDate()))
      );

  const goalIds = goals && goals.map((goal: any) => goal.id);
  const notSetGoals =
    !!participants &&
    goalIds &&
    participants.filter((user: any) => !goalIds.includes(user.id));

  return {
    goals,
    notSetGoals,
    userShortId,
    isLoaded: isLoaded(participants) && !state.objective.loading,
    ...props
  };
};

const queries = (props: any) => {
  const { challengeId, userShortId } = props;

  if (!(challengeId && userShortId)) return [];

  return [
    {
      collection: 'challenges',
      doc: challengeId,
      storeAs: 'participants',
      subcollections: [
        {
          collection: 'participants'
        }
      ]
    }
  ];
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  firestoreConnect(queries)
) as any;
