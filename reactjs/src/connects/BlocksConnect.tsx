import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchBlockedUsers } from '~/actions/blockAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchBlockedUsers
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const myUserId = state.user.profile.shortId;

  return {
    blocks: state.block.items,
    loading: state.block.loading,
    error: state.block.error,
    myUserId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
