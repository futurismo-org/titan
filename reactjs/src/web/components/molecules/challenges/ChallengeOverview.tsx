import * as React from 'react';
import MarkdownView from '../../atoms/MarkdownView';
import Youtube from '../../atoms/YoutubeWidget';
import ChallengeSchedule from '../../atoms/challenges/ChallengeSchedule';
import Flag from '~/web/containers/FlagContainer';

const ChallengeOverview = (props: any) => {
  const { text, youtubeId, openedAt, closedAt, challenge } = props;

  return (
    <React.Fragment>
      <br />
      {youtubeId && <Youtube id={youtubeId} />}
      <MarkdownView text={text} />
      <ChallengeSchedule openedAt={openedAt} closedAt={closedAt} />
      <Flag challenge={challenge} />
    </React.Fragment>
  );
};

export default ChallengeOverview;
