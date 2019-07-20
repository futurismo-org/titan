import * as React from 'react';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import TopicList from './TopicList';

const Topics = (props: any) => {
  const { topics, loading, error, resourceId, fetchTopics } = props;

  React.useEffect(() => {
    fetchTopics(resourceId);
  }, [fetchTopics, resourceId]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {topics && (
        <React.Fragment>
          <Title text="トピック" />
          <TopicList topics={topics} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Topics;
