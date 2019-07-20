import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import moment from 'moment';
import { fetchChallenges } from '~/actions/challengeAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchChallenges: fetchChallenges
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const challenges = state.challenge.items;

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
    moment(new Date().setHours(0, 0, 0, 0)).isAfter(
      challenge.data().closedAt.toDate()
    )
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
