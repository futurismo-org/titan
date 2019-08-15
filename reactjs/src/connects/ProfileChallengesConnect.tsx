import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import moment from '~/lib/moment';
import { isHideSensitive } from '~/lib/challenge';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const { allowSensitive } = profile;
  const { challenges } = props;

  const debugSensitive = state.sensitive && state.sensitive.show;

  const filterdChallenges = challenges
    .sort((x: any, y: any) =>
      moment(y.closedAt.toDate()).diff(moment(x.closedAt.toDate()))
    )
    .filter((challenge: any) => challenge.score)
    .filter(
      (challenge: any) =>
        !isHideSensitive(debugSensitive, challenge.sensitive, allowSensitive)
    );

  return {
    ...props,
    challenges: filterdChallenges
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
