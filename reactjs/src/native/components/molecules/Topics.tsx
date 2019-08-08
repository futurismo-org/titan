import * as React from 'react';
import { View } from 'react-native';
import Error from '../atoms/Error';
import TopicList from './TopicList';
import PostButton from '~/native/containers/PostButtonContainer';

const Topics = (props: any) => {
  const {
    topics,
    loading,
    error,
    resourceId,
    fetchTopics,
    postButtonPath,
    topicPath,
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
            <PostButton to={postButtonPath} text="トピックを新規投稿" />
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

export default Topics;
