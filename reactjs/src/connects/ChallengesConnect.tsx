import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';
import { fetchChallenges, resetChallengeInfo } from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenges,
      resetChallengeInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challenges = state.challenge.items.filter(
    (challenge: any) => !challenge.freezed
  );

  const preOpenChallenges = challenges.filter((challenge: any) =>
    moment(new Date().setHours(0, 0, 0, 0)).isBefore(
      challenge.openedAt.toDate()
    )
  );
  const openingChallenges = challenges.filter(
    (challenge: any) =>
      moment(new Date().setHours(0, 0, 0, 0)).isBefore(
        challenge.closedAt.toDate()
      ) &&
      moment(new Date().setHours(0, 0, 0, 1)).isAfter(
        challenge.openedAt.toDate()
      )
  );
  const closedChallenges = challenges.filter((challenge: any) =>
    moment(new Date().setHours(0, 0, 0, 0)).isAfter(challenge.closedAt.toDate())
  );

  return {
    preOpenChallenges,
    openingChallenges,
    closedChallenges,
    loading: state.challenge.loading,
    error: state.challenge.error,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
