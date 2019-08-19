import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { getParticipantsId } from '~/lib/resource';
import { fetchParticipants } from '~/actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const { challegeId } = props;
  const resourceId = getParticipantsId(challegeId);

  const users = state.user.items;

  return {
    users,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
