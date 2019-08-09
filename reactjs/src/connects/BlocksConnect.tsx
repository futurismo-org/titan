import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchBlocks } from '~/actions/securityAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchBlocks
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const myUserId = state.firebase.profile.shortId;

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
