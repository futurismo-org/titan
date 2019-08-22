import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getParticipantsId } from '~/lib/resource';
import { fetchParticipants } from '~/actions/participantAction';
import { fetchChallengeObjectives } from '~/actions/objectiveAction';

import moment from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants, fetchChallengeObjectives }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challegeId } = props;
  const resourceId = getParticipantsId(challegeId);

  const users = state.participant.items;
  const objectives = state.objective.items.filter(
    (objective: any) => objective
  );

  const goals =
    !!users &&
    objectives.length !== 0 &&
    objectives
      .map((objective: any) => {
        const user = users.find(
          (user: any) => objective.userShortId === user.id
        );

        return {
          id: user.id,
          displayName: user.displayName,
          photoURL: user.photoURL,
          startedAt: user.startedAt,
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
    !!users &&
    goalIds &&
    users.filter((user: any) => !goalIds.includes(user.id));

  return {
    users,
    resourceId,
    goals,
    notSetGoals,
    loading: state.objective.loading | state.participant.loading,
    erorr: state.objective.error || state.participant.loading,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
