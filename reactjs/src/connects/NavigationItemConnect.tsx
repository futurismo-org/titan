import { connect } from 'react-redux';
import { isLogin } from '~/lib/firebase';

export const mapStateToProps = (state: any, props: any) => ({
  isLogin: isLogin(state),
  profile: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps);
