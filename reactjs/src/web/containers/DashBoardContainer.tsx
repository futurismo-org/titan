import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch: any) => {
  return {
    // fetchChallenges: (num: number) => dispatch(fetchChallenges(num))
  };
};

export default connect(mapDispatchToProps);
