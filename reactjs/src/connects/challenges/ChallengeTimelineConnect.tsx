import { connect } from 'react-redux';
import shortId from 'shortid';

import moment, { isBeforeInDaysFromNow } from '~/lib/moment';
import {
  POST_TYPE_JOIN,
  POST_TYPE_OPEN,
  POST_TYPE_CLOSE,
  POST_TYPE_RECORD,
  POST_TYPE_RESET,
  POST_TYPE_TOPIC,
  POST_TYPE_NOTE
} from '~/constants/post';
import { RECORD } from '~/lib/challenge';
import { getChallengeTimeline } from '~/lib/getstream';

const generateItems = (data: any, challenge: any) => {
  const items = [] as any[];
  items.push({
    id: shortId.generate(),
    type: POST_TYPE_OPEN,
    timestamp: challenge.openedAt.toDate(),
    data: {
      openedAt: challenge.openedAt.toDate()
    }
  });

  items.push({
    id: shortId.generate(),
    type: POST_TYPE_CLOSE,
    timestamp: challenge.closedAt.toDate(),
    data: {
      closedAt: challenge.closedAt.toDate()
    }
  });

  return items
    .filter((item: any) => isBeforeInDaysFromNow(item.timestamp, 7))
    .sort((x: any, y: any) => moment(y.timestamp).diff(moment(x.timestamp)));
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;

  const feedNotes = () =>
    getChallengeTimeline(challengeId).then((data: any) =>
      generateItems(data, challenge)
    );
  // .then((posts: any) =>
  //   posts.sort((x: any, y: any) =>
  //     moment(x.timestamp).diff(moment(y.timestamp))
  //   )
  // );

  return {
    feedNotes,
    ...props
  };
};

export default connect(mapStateToProps);
