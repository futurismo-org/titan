import * as React from 'react';
import styled from 'styled-components';
import MarkdownView from '../../atoms/MarkdownView';

const VideoWrapper = styled.div`
  max-width: 853px;
`;

const Video = styled.div`
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25;
  height: 0;
`;

const StyledIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Youtube = (youtubeId: string) => {
  return (
    <VideoWrapper>
      <Video>
        <StyledIframe
          title="yotuube"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          frameBorder="0"
        />
      </Video>
    </VideoWrapper>
  );
};

const ChallengeOverview = (props: any) => {
  const { text, youtubeId } = props;

  return (
    <React.Fragment>
      {youtubeId && Youtube(youtubeId)}
      <MarkdownView text={text} />
    </React.Fragment>
  );
};

export default ChallengeOverview;
