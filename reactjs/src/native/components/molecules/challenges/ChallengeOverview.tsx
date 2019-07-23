import * as React from 'react';
import { Button, Text } from 'native-base';
import MarkdownView from '../../atoms/MarkdownView';
// import Youtube from '../../atoms/YoutubeWidget';
// import ChallengeSchedule from '../../atoms/challenges/ChallengeSchedule';

const ChallengeOverview = (props: any) => {
  const { text, youtubeId, openedAt, closedAt, id } = props;

  return (
    <React.Fragment>
      {/* {youtubeId && <Youtube id={youtubeId} />} */}
      {/* <Link to={`/c/${id}/`} */}
      <Button>
        <Text>test</Text>
      </Button>
      <MarkdownView text={text} />
      {/* <ChallengeSchedule openedAt={openedAt} closedAt={closedAt} /> */}
    </React.Fragment>
  );
};

export default ChallengeOverview;
