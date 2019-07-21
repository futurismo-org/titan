import React, { useMemo, useEffect } from 'react';
import { Button, Text } from 'native-base';
import { Linking, Alert, View } from 'react-native';
import { withRouter } from 'react-router-native';
import Progress from '../atoms/CircularProgress';
import Title from '../atoms/Title';

import { fromNow } from '~/lib/moment';
import TwitterShareIcon from '~/native/components/atoms/TwitterShareIcon';
import MarkdownView from '../atoms/MarkdownView';

import { isCurrentUser } from '~/lib/native/auth';
import { deleteResource } from '~/lib/firebase';

const Topic = withRouter((props: any) => {
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

  const handleDelete = (redirectPath: string, resourceId: string) => {
    Alert.alert(
      'トピック削除',
      '削除したデータは元に戻せません。本当に削除しますか？',
      [
        {
          text: 'はい',
          onPress: () =>
            deleteResource(resourceId).then(() =>
              props.router.push(redirectPath)
            )
        },
        {
          text: 'いいえ',
          style: 'cancel'
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <React.Fragment>
      {error && <Text>Error: {error}</Text>}
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
          {!!topic.url && (
            <React.Fragment>
              <Text onPress={() => Linking.openURL(topic.url)}>
                {topic.url.substr(0, 30) + '...'}
              </Text>
              <Text />
            </React.Fragment>
          )}
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
              <Button light>
                <Text>編集</Text>
              </Button>
              <Button
                light
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
});

export default Topic;
