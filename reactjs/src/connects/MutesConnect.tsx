import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchMutes } from '~/actions/securityAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchMutes
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const myUserId = state.firebase.profile.shortId;

  return {
    mutes: state.mute.items,
    loading: state.mute.loading,
    error: state.mute.error,
    myUserId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
