import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.match.params.id;
  const userShortId = props.match.params.userShortId;

  return {
    challengeId,
    userShortId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
