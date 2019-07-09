import * as React from 'react';
import styled from 'styled-components';

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

const YoutubeWidget = (props: any) => {
  const youtubeId = props.id;
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

export default YoutubeWidget;
