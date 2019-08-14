import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import firebase from '~/lib/firebase';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({}, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { userShortId } = props;

  const fetchTotalScore = () => {
    return firebase
      .firestore()
      .collection('profiles')
      .doc(userShortId)
      .get()
      .then(doc => doc.data())
      .then(data => (data ? data.totalScore : 0));
  };

  return {
    fetchTotalScore,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
