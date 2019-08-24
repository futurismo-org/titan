import { connect } from 'react-redux';

export const mapStateToProps = (state: any, props: any) => ({
  isLogin: !state.user.profile.isEmpty && state.user.profile.isLoaded,
  ...props
});

export default connect(mapStateToProps);
