import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  // const { challengeId, userShortId } = props;

  return {
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
