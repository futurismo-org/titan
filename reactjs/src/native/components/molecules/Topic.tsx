import React, { useMemo, useEffect } from 'react';
import { Text, Button, View } from 'native-base';
import { Linking, Alert } from 'react-native';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import { fromNow } from '~/lib/moment';
import TwitterShareIcon from '~/native/components/atoms/TwitterShareIcon';
import MarkdownView from '../atoms/MarkdownView';

import { isCurrentUser } from '~/lib/native/auth';
import { deleteResource } from '~/lib/firebase';

const handleDelete = (redirectPath: string, resourceId: string) => {
  Alert.alert(
    'トピック削除',
    '削除したデータは元に戻せません。本当に削除しますか？',
    [
      {
        text: 'はい',
        onPress: () => deleteResource(resourceId)
      },
      {
        text: 'いいえ',
        style: 'cancel'
      }
    ],
    { cancelable: true }
  );
};

const Topic = (props: any) => {
  const {
    topic,
    loading,
    error,
    resourceId,
    shareURL,
    editTopicPath,
    redirectPath,
    fetchTopic,
    setOgpInfo,
    resetOgpInfo
  } = props;

  const title = useMemo(() => {
    return topic ? topic.title : '';
  }, [topic]);
  const description = useMemo(() => {
    return topic ? topic.text : '';
  }, [topic]);
  const url = useMemo(() => {
    return shareURL;
  }, [shareURL]);

  useEffect(() => {
    fetchTopic(resourceId);

    setOgpInfo({
      title,
      description,
      url
    });

    return () => {
      resetOgpInfo();
    };
  }, [
    description,
    fetchTopic,
    resetOgpInfo,
    resourceId,
    setOgpInfo,
    title,
    url
  ]);

  return (
    <React.Fragment>
      {error && <strong>Error: {error}</strong>}
      {loading && <Progress />}
      {topic && (
        <React.Fragment>
          <Text>
            Posted by {topic.userName || 'Anonymous'}{' '}
            {fromNow(topic.createdAt.toDate())}{' '}
          </Text>
          <Title
            text={topic.title}
            onPress={() => Linking.openURL(topic.url)}
          />
          {topic.url && (
            <Text onPress={() => Linking.openURL(topic.url)}>
              {topic.url.substr(0, 30) + '...'}
            </Text>
          )}
          <Text />
          <MarkdownView text={topic.text} />
          <TwitterShareIcon
            title={topic.title}
            url={shareURL}
            hashtag="#Titan"
          />
          {/* {isCurrentUser ? ( */}
          <React.Fragment>
            <Text />
            <View style={{ flexDirection: 'row' }}>
              <Button iconLeft iconRight light>
                <Text>編集</Text>
              </Button>
              <Button
                light
                iconLeft
                iconRight
                onPress={() => handleDelete(redirectPath, resourceId)}
              >
                <Text>削除</Text>
              </Button>
            </View>
          </React.Fragment>
          {/* ) : null} */}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Topic;
