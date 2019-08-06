import * as React from 'react';
import ActionButton from 'react-native-action-button';
import { Icon } from 'native-base';
import { withRouter } from 'react-router-native';
import Error from '../atoms/Error';
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
    postButtonPath,
    topicPath,
    history
  } = props;

  React.useEffect(() => {
    fetchTopics(resourceId);
  }, [fetchTopics, resourceId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {topics && (
        <React.Fragment>
          <Title text="トピック" />
          <TopicList topics={topics} topicPath={topicPath} />
        </React.Fragment>
      )}
      <ActionButton
        buttonColor={primaryColor}
        onPress={() => history.push(postButtonPath)}
      >
        <Icon name="md-create" />
      </ActionButton>
    </React.Fragment>
  );
};

export default withRouter(Topics);
