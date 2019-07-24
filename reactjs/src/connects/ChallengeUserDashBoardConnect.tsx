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

  const profile = state.firebase.profile;
  const selfShortId = profile.shortId;

  // 他人のidは外部から指定される。指定されないときは自分。
  const userShortId = props.match ? props.match.params.userId : selfShortId;

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
