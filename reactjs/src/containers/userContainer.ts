import { connect } from 'react-redux';
import { setUserInfo } from '../actions/userAction';
import AuthModal from '../components/atoms/AuthModal';

const mapStateToProps = (state: any) => ({
  userInfo: state.userInfo
});

const actions = {
  setUserInfo
};

export default connect(
  mapStateToProps,
  actions
)(AuthModal);
