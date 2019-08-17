import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchProfileChallenges } from '~/actions/profileAction';
import { isClosed } from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchProfileChallenges
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { profile } = state.firebase;
  const userShortId = profile.shortId;

  const resourceId = `/profiles/${userShortId}/challenges`;
  const challenges = state.challenge.items.filter((challenge: any) =>
    isClosed(challenge.closedAt.toDate())
  );

  return {
    resourceId,
    challenges,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
