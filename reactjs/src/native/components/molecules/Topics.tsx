import * as React from 'react';
import { withRouter } from 'react-router-native';
import { Button, Text } from 'native-base';
import { View } from 'react-native';
import Error from '../atoms/Error';
import TopicList from './TopicList';

const Topics = (props: any) => {
  const {
    topics,
    loading,
    error,
    resourceId,
    fetchTopics,
    postButtonPath,
    topicPath,
    history,
    allowSensitive
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
          <View style={{ flex: 1, alignSelf: 'flex-end' }}>
            <Button
              rounded
              primary
              onPress={() => history.push(postButtonPath)}
            >
              <Text>トピックを新規投稿</Text>
            </Button>
          </View>
          <TopicList
            topics={topics}
            topicPath={topicPath}
            allowSensitive={allowSensitive}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withRouter(Topics);
