import { connect } from 'react-redux';
import LeaderBoard from '../components/molecules/challenges/ChallengeLeaderBoard';

const mapStateToProps = (state: any) => ({
  userInfo: state.user
});

export default connect(mapStateToProps)(LeaderBoard);
