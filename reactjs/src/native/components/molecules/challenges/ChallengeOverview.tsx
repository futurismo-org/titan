import * as React from 'react';
import MarkdownView from '../../atoms/MarkdownView';
import Youtube from '../../atoms/YoutubeWidget';
import ChallengeSchedule from '../../atoms/challenges/ChallengeSchedule';

const ChallengeOverview = (props: any) => {
  const { text, youtubeId, openedAt, closedAt } = props;

  return (
    <React.Fragment>
      <ChallengeSchedule openedAt={openedAt} closedAt={closedAt} />
      <MarkdownView text={text} />
      {!!youtubeId && <Youtube id={youtubeId} />}
    </React.Fragment>
  );
};

export default ChallengeOverview;
