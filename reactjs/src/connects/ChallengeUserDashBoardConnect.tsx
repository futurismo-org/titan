import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';
import { fetchUser } from '~/actions/userAction';
import { formatDate } from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUser,
      setOgpInfo,
      resetOgpInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;

  const userShortId = props.match.params.userShortId;
  const resourceId = `/challenges/${challenge.id}/participants/${userShortId}`;

  const user = state.user.target;
  const joinDate = user && formatDate(user.createdAt.toDate());

  return {
    user,
    loading: state.user.loading,
    error: state.user.error,
    resourceId,
    joinDate,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
