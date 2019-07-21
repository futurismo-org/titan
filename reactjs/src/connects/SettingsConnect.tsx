import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const user = state.firebase.profile;
  const userId = user.id;

  const resourceId = `/users/${userId}`;

  const isLogin = !user.isEmpty && user.isLoaded;

  return {
    user,
    resourceId,
    isLogin,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
