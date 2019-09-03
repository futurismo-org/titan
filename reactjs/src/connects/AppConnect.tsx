import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchFirebaseUser } from '~/actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchFirebaseUser }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const userId = state.firebase.auth.uid;
  const resourceId = `/users/${userId}`;

  return {
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
