import * as React from 'react';
import DiscordHistories from '../../atoms/DiscordHistories';

const ChallengeTimeline = (props: any) => {
  const { channelId } = props;

  if (channelId) {
    return <DiscordHistories channelId={props.channelId} limit={30} />;
  }
  return <p>準備中...</p>;
};

export default ChallengeTimeline;
