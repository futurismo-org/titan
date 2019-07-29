import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const isLogin = !profile.isEmpty && profile.isLoaded;

  return {
    isLogin,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
