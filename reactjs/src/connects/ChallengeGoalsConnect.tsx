import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getParticipantsId } from '~/lib/resource';
import { fetchParticipants } from '~/actions/participantAction';
import { fetchChallengeObjectives } from '~/actions/objectiveAction';

import moment from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants, fetchChallengeObjectives }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challengeId } = props;
  const resourceId = getParticipantsId(challengeId);

  const participants = state.participant.items;
  const objectives = state.objective.items.filter(
    (objective: any) => objective
  );

  const goals =
    !!participants &&
    objectives.length !== 0 &&
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
    participants,
    resourceId,
    goals,
    notSetGoals,
    loading: state.participant.loading || state.objective.loading,
    erorr: state.participant.error || state.objective.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
