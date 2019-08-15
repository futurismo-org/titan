import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const { allowSensitive } = profile;
  const { userShortId, category } = props;

  const debugSensitive = state.sensitive && state.sensitive.show;
  const path = `/u/${userShortId}/cat/${category.id}`;

  return {
    debugSensitive,
    allowSensitive,
    path,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
