import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';
import { fetchChallenge } from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenge,
      setOgpInfo,
      resetOgpInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const profile = state.firebase.profile;
  const selfShortId = profile.shortId;

  // 他人のidは外部から指定される。指定されないときは自分。
  const userShortId = props.userShortId || selfShortId;

  return {
    userShortId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
