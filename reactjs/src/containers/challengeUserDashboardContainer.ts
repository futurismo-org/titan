import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import DashBoard from 'web/components/molecules/challenges/ChallengeUserDashBoard';
import { setOgpInfo, resetOgpInfo } from 'actions/ogpAction';

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
