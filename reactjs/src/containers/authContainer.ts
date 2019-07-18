import { connect } from 'react-redux';
import NavigationItem from 'web/components/molecules/NavigationItem';
import { store } from '../store';

type AllState = ReturnType<typeof store.getState>;

const mapStateToProps = (state: AllState) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

export default connect(mapStateToProps)(NavigationItem);
