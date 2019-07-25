import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipants } from '~/actions/userAction';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ fetchParticipants }, dispatch);

const mapStateToProps = (state: any, props: any) => {
  const challengeId = props.challenge.id;
  const resourceId = `/challenges/${challengeId}/participants`;

  const profile = state.firebase.profile;
  const userShortId = profile.shortId;

  const participants = state.user.items;

  const join =
    participants.filter((paritcipant: any) => paritcipant.id === userShortId)
      .length === 1;

  const participant = join ? participants[0] : null;

  return {
    join,
    user: profile,
    participant,
    error: state.user.error,
    loading: state.user.loading,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
