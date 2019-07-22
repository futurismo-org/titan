import { connect } from 'react-redux';
import AuthModal from 'web/components/atoms/AuthModal';
import { setUserInfo } from 'actions/userAction';

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
