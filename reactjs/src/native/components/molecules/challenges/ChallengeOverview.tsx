import * as React from 'react';
import MarkdownView from '../../atoms/MarkdownView';
import Youtube from '../../atoms/YoutubeWidget';
import ChallengeSchedule from '../../atoms/challenges/ChallengeSchedule';
import Flag from '~/native/containers/FlagContainer';

const ChallengeOverview = (props: any) => {
  const { text, youtubeId, openedAt, closedAt, challenge } = props;

  return (
    <React.Fragment>
      <ChallengeSchedule openedAt={openedAt} closedAt={closedAt} />
      <MarkdownView text={text} />
      {!!youtubeId && <Youtube id={youtubeId} />}
      <Flag challenge={challenge} />
    </React.Fragment>
  );
};

export default ChallengeOverview;
