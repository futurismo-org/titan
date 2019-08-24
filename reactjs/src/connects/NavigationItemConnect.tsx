import { connect } from 'react-redux';

export const mapStateToProps = (state: any, props: any) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps);
