import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';
import { fetchParticipant } from '~/actions/participantAction';
import { formatDate } from '~/lib/moment';

import firebase from '~/lib/firebase';
import { getCategoryId } from '~/lib/challenge';
import { getCategoryDashboardPath } from '~/lib/url';
import { RECORD_OPTION_TIME } from '~/constants/strategy';

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      fetchParticipant,
      setOgpInfo,
      resetOgpInfo
    },
    dispatch
  );

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;

  const { userShortId } = props.match.params;
  const resourceId = `/challenges/${challenge.id}/participants/${userShortId}`;

  const user = state.participant.target;
  const joinDate = user && formatDate(user.createdAt.toDate());

  const deleteHistoryHandler = (history: any) => () => {
    return firebase
      .firestore()
      .doc(resourceId)
      .update({
        histories: firebase.firestore.FieldValue.arrayRemove(history)
      });
  };

  const categoryId = getCategoryId(challenge.categoryRef);
  const categoryPath = getCategoryDashboardPath(categoryId, userShortId);

  let totalMinutesMessage = '';
  if (challenge.recordOption === RECORD_OPTION_TIME) {
    const totalMinutes =
      user && user.histories.reduce((p: any, x: any) => p + x.minutes, 0);
    totalMinutesMessage = `総実施時間: ${Math.floor(
      totalMinutes / 60
    )}時間${totalMinutes % 60}分`;
  }

  return {
    user,
    loading: state.participant.loading,
    error: state.participant.error,
    deleteHistoryHandler,
    resourceId,
    joinDate,
    categoryPath,
    totalMinutesMessage,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
