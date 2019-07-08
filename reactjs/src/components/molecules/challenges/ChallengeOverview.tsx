import * as React from 'react';
// import Youtube from 'react-youtube';
import MarkdownView from '../../atoms/MarkdownView';

const Youtube = (youtubeId: string) => {
  return (
    <div
      className="video"
      style={{
        position: 'relative',
        paddingBottom: '56.25%' /* 16:9 */,
        paddingTop: 25,
        height: 0
      }}
    >
      <iframe
        title="yotuube"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
        src={`https://www.youtube.com/embed/${youtubeId}`}
        frameBorder="0"
      />
    </div>
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
