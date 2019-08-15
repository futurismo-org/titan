import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const userShortId = props.match.params.userShortId;
  const categoryId = props.match.params.categoryid;

  return {
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
