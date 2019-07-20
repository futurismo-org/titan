import * as React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';
import { Link } from 'react-router-native';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';
import TopicList from './TopicList';

import { primaryColor } from '~/lib/theme';

const Topics = (props: any) => {
  const {
    topics,
    loading,
    error,
    resourceId,
    fetchTopics,
    postButtonPath
  } = props;

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
      <ActionButton buttonColor={primaryColor}>
        <Link to={postButtonPath}>
          <Icon name="md-create" />
        </Link>
      </ActionButton>
    </React.Fragment>
  );
};

export default Topics;
