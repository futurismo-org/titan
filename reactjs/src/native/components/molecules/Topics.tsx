import * as React from 'react';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

const Topics = (props: any) => {
  const { topics, loading, error, resourceId, fetchTopics } = props;

  React.useEffect(() => {
    fetchTopics(resourceId);
  }, [fetchTopics, resourceId]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {topics && <Title text="トピック一覧" />}
    </React.Fragment>
  );
};

export default Topics;
