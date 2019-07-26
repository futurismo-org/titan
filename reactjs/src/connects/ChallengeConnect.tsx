import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchChallenge } from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenge: fetchChallenge
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.match.params.id;
  const resourceId = `/challenges/${challengeId}`;

  const challenge = state.challenge.target;

  const profile = state.firebase.profile;
  const userShortId = profile.shortId;
  const isLogin = !profile.isty && profile.isLoaded;

  return {
    challenge,
    isLogin,
    loading: state.category.loading || state.challenge.loading,
    error: state.category.error || state.challenge.error,
    resourceId,
    userShortId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
