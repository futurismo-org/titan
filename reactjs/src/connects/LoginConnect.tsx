import { connect } from 'react-redux';

export const mapStateToProps = (state: any, props: any) => ({
  isLogin: !state.firebase.profile.isEmpty && state.firebase.profile.isLoaded,
  ...props
});

export default connect(mapStateToProps);
