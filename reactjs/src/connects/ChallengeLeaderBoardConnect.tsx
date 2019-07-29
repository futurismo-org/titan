import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { fetchParticipants } from '~/actions/userAction';

import { fromNow } from '~/lib/moment';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchUsers: fetchParticipants
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challengeId } = props;
  const resourceId = `/challenges/${challengeId}/participants`;

  const users = state.user.items
    .sort(
      (x: any, y: any) =>
        y.score - x.score ||
        y.days - x.days ||
        y.maxDays - x.maxDays ||
        y.updatedAt.toDate() - x.updatedAt.toDate()
    )
    .map((user: any) => {
      user.photoURL = user.photoURL || 'https://titan-fire.com/anonymous.png';
      user.latest = fromNow(user.updatedAt.toDate());
      user.profilePath = `/c/${challengeId}/u/${user.id}`;
      user.displayName = user.displayName || 'Anonymous';
      return user;
    });

  const size = users.length;

  const isSameScore = (users: any, i: number) =>
    users[i - 1].score === users[i].score &&
    users[i - 1].days === users[i].days &&
    users[i - 1].maxDays === users[i].maxDays;

  const rankings = new Array(size);
  rankings[0] = 1;
  for (let i = 1; i < size; i += 1) {
    rankings[i] = isSameScore(users, i) ? rankings[i - 1] : i + 1;
  }

  const rankedUsers = new Array(size);
  for (let i = 0; i < size; i += 1) {
    rankedUsers[i] = { rank: rankings[i], ...users[i] };
  }

  return {
    users: rankedUsers,
    loading: state.user.loading,
    error: state.user.error,
    resourceId,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
