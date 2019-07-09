import * as React from 'react';
import MarkdownView from '../../atoms/MarkdownView';
import Youtube from '../../atoms/YoutubeWidget';

const ChallengeOverview = (props: any) => {
  const { text, youtubeId } = props;

  return (
    <React.Fragment>
      {youtubeId && <Youtube id={youtubeId} />}
      <MarkdownView text={text} />
    </React.Fragment>
  );
};

export default ChallengeOverview;
