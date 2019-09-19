import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { setOgpInfo, resetOgpInfo } from '~/actions/ogpAction';
import { fetchParticipant } from '~/actions/participantAction';
import moment, { formatDate, formatDateShort } from '~/lib/moment';

import firebase from '~/lib/firebase';
import { getCategoryId } from '~/lib/challenge';
import { getCategoryDashboardPath } from '~/lib/url';
import { RECORD_OPTION_TIME } from '~/constants/strategy';

const aggregateDays = (histories: any[], openedAt: Date, closedAt: Date) => {
  const map = histories
    .filter((history: any) => history)
    .reduce((result: any, current: any) => {
      const month = current.timestamp.toDate().getMonth();
      const date = current.timestamp.toDate().getDate();
      const timestamp = current.timestamp;
      const minutes = current.minutes ? current.minutes : 0;

      const element = result.find((p: any) => {
        return p.month === month && p.date === date;
      });

      if (element) {
        element.count += minutes;
      } else {
        result.push({
          date,
          month,
          timestamp,
          count: minutes
        });
      }
      return result;
    }, []);

  return [
    ...Array(moment(closedAt).diff(moment(openedAt), 'days') + 1).keys()
  ].map(n => {
    const element = map.find((p: any) =>
      moment(p.timestamp.toDate()).isSame(
        moment(openedAt).add(n, 'days'),
        'dates'
      )
    );
    const date = formatDateShort(
      moment(openedAt)
        .add(n, 'days')
        .toDate()
    );

    if (element) {
      return {
        date,
        minutes: element.count
      };
    } else {
      return {
        date,
        minutes: 0
      };
    }
  });
};

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
  let todayMinutesMessage = '';
  if (challenge.recordOption === RECORD_OPTION_TIME) {
    const totalMinutes =
      user &&
      user.histories.reduce((p: any, x: any) => {
        if (x.minutes) {
          return p + x.minutes;
        } else {
          return p;
        }
      }, 0);
    totalMinutesMessage = `総実施時間: ${Math.floor(
      totalMinutes / 60
    ).toString()}時間${(totalMinutes % 60).toString()}分`;

    const todayMinutes =
      user &&
      user.histories
        .filter((history: any) =>
          moment(history.timestamp.toDate()).isSame(moment(), 'days')
        )
        .reduce((p: any, x: any) => {
          if (x.minutes) {
            return p + x.minutes;
          } else {
            return p;
          }
        }, 0);
    todayMinutesMessage = `本日: ${Math.floor(
      todayMinutes / 60
    ).toString()}時間${(todayMinutes % 60).toString()}分`;
  }

  const hoursByDay =
    user &&
    aggregateDays(
      user.histories,
      challenge.openedAt.toDate(),
      challenge.closedAt.toDate()
    );

  return {
    user,
    loading: state.participant.loading,
    error: state.participant.error,
    deleteHistoryHandler,
    resourceId,
    joinDate,
    categoryPath,
    totalMinutesMessage,
    todayMinutesMessage,
    hoursByDay,
    ...props
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
