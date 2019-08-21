import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getParticipantsId } from '~/lib/resource';
import { fetchParticipants } from '~/actions/userAction';
import { fetchChallengeObjectives } from '~/actions/objectiveAction';

import moment from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants, fetchChallengeObjectives }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challegeId } = props;
  const resourceId = getParticipantsId(challegeId);

  const users = state.user.items;
  const objectives = state.objective.items.filter(
    (objective: any) => objective
  );

  const goals =
    users && objectives && objectives.length !== 0
      ? users
          .map((user: any) => {
            const objective = objectives.find(
              (objective: any) => objective.userShortId === user.id
            );

            console.log(objectives, user.id);

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
          )
      : users.sort((x: any, y: any) =>
          moment(y.updatedAt.toDate()).diff(moment(x.updatedAt.toDate()))
        );

  return {
    users,
    resourceId,
    goals,
    loading: state.objective.loading || state.user.loading,
    erorr: state.objective.error || state.user.loading,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
