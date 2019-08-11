import * as React from 'react';
import { View, Text } from 'react-native';
import { withRouter } from 'react-router-native';
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
    allowSensitive,
    fetchMutes,
    myUserId,
    fetchBlockingUsers,
    history
  } = props;

  React.useEffect(() => {
    fetchTopics(resourceId);
    fetchMutes(myUserId);
    fetchBlockingUsers(myUserId);
  }, [fetchBlockingUsers, fetchMutes, fetchTopics, myUserId, resourceId]);

  return (
    <React.Fragment>
      {error && <Error error={error} />}
      {loading && null}
      {topics && (
        <React.Fragment>
          <View style={{ flex: 1, alignSelf: 'flex-end' }}>
            <PostButton to={postButtonPath} text="トピックを新規投稿" />
          </View>
          <Text />
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <Text>投稿する際は</Text>
            <Text
              style={{ textDecorationLine: 'underline' }}
              onPress={() => history.push('/guidelines')}
            >
              コミュニティガイドライン
            </Text>
            <Text>を遵守ください。</Text>
          </View>
          <Text />
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
