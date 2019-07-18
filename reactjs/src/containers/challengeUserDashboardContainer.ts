import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setOgpInfo, resetOgpInfo } from '../actions/ogpAction';

import DashBoard from '../components/molecules/challenges/ChallengeUserDashBoard';

const mapStateToProps = (state: any, props: any) => ({
  challengeId: props.match.params.challengeId,
  userId: props.match.params.userId,
  ...props
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setOgpInfo: bindActionCreators(setOgpInfo, dispatch),
    resetOgpInfo: bindActionCreators(resetOgpInfo, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashBoard);
