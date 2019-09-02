import { connect } from 'react-redux';
import shortId from 'shortid';

import moment from '~/lib/moment';
import { POST_TYPE_OPEN, POST_TYPE_CLOSE } from '~/constants/post';
import { getChallengeTimeline } from '~/lib/getstream';
import { createPost } from '~/lib/post';
import { isChallengeClosed, isChallengeOpened } from '~/lib/challenge';

const generateItems = (data: any, challenge: any) => {
  const items = [] as any[];

  if (isChallengeOpened(challenge.openedAt.toDate())) {
    items.push({
      id: shortId.generate(),
      type: POST_TYPE_OPEN,
      timestamp: challenge.openedAt.toDate(),
      data: {
        openedAt: challenge.openedAt.toDate()
      }
    });
  }

  if (challenge.closedAt && isChallengeClosed(challenge.closedAt.toDate())) {
    items.push({
      id: shortId.generate(),
      type: POST_TYPE_CLOSE,
      timestamp: challenge.closedAt.toDate(),
      data: {
        closedAt: challenge.closedAt.toDate()
      }
    });
  }

  data.map((post: any) => items.push(createPost(post)));

  return items.sort((x: any, y: any) =>
    moment(y.timestamp).diff(moment(x.timestamp))
  );
};

const mapStateToProps = (state: any, props: any) => {
  const { challenge } = props;
  const challengeId = challenge.id;

  const feedItems = () =>
    getChallengeTimeline(challengeId).then((data: any) =>
      generateItems(data, challenge)
    );

  return {
    feedItems,
    challengeId,
    ...props
  };
};

export default connect(mapStateToProps);
