import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const { allowSensitive } = profile;

  return {
    allowSensitive,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
