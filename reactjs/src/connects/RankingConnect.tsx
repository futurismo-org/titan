import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchUsers } from '~/actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers: fetchUsers
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  return {
    users: state.user.items,
    loading: state.user.loading,
    error: state.user.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
