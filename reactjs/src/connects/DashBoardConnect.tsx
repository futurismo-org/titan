import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchChallenges } from 'actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenges: fetchChallenges
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => ({
  challenges: state.challenge && state.challenge.items,
  loading: state.challenge && state.challenge.loading,
  error: state.challenge && state.challenge.error,
  ...props
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
