import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipants } from '~/actions/userAction';

import { getParticipantsId } from '~/lib/resource';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.challenge.id;
  const resourceId = getParticipantsId(challengeId);

  const { profile } = state.firebase;
  const userShortId = profile.shortId;
  const participants = state.user.items;

  const join =
    participants.filter((paritcipant: any) => paritcipant.id === userShortId)
      .length === 1;

  return {
    join,
    loading: state.user.loading,
    error: state.user.error,
    user: profile,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
