import React, { useEffect } from 'react';
import { Button, Text, View } from 'native-base';
import { Linking, Alert, TouchableOpacity } from 'react-native';
import { withRouter, Link } from 'react-router-native';
import Title from '../atoms/Title';
import Error from '../atoms/Error';

import { fromNow } from '~/lib/moment';
import TwitterShareIcon from '~/native/components/atoms/TwitterShareIcon';
import MarkdownView from '../atoms/MarkdownView';

import Progress from '../atoms/CircularProgress';
import * as firebase from '~/lib/firebase';
import TopicFlag from '../atoms/TopicFlag';

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
    history,
    isCurrentUser,
    isLogin,
    collection,
    collectionId,
    allowSensitive
  } = props;

  useEffect(() => {
    fetchTopic(resourceId);
  }, [fetchTopic, resourceId]);

  const handleDelete = (redirectPath: string, resourceId: string) => {
    Alert.alert(
      'トピック削除',
      '削除したデータは元に戻せません。本当に削除しますか？',
      [
        {
          text: 'はい',
          onPress: () =>
            firebase.remove(resourceId).then(() => history.push(redirectPath))
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
      {error && <Error error={error} />}
      {loading && <Progress />}
      {topic &&
        (topic.banned ? (
          <Text>
            このコンテンツは不適切なコンテンツと判断して運営が削除しました。
          </Text>
        ) : topic.sensitive && !allowSensitive ? (
          <TouchableOpacity onPress={() => history.path('/settings')}>
            <Title text="センシティブな内容のあるコンテンツです" />
            <Text>設定を変更</Text>
          </TouchableOpacity>
        ) : (
          <React.Fragment>
            <Text>
              Posted by {topic.userName || 'Anonymous'}{' '}
              {fromNow(topic.createdAt.toDate())}{' '}
            </Text>
            <TouchableOpacity
              onPress={
                topic.url && topic.url !== ''
                  ? () => Linking.openURL(topic.url)
                  : () => null
              }
            >
              <Title text={topic.title} left />
              {!!topic.url && (
                <React.Fragment>
                  <Text style={{ color: 'blue' }}>{`${topic.url.substr(
                    0,
                    30
                  )}...`}</Text>
                  <Text />
                </React.Fragment>
              )}
            </TouchableOpacity>
            <MarkdownView text={topic.text} />
            <View style={{ flex: 1, alignItems: 'flex-end' }}>
              <TopicFlag
                isLogin={isLogin}
                topic={topic}
                collectionType={collection}
                collectionId={collectionId}
              />
            </View>
            <Text />
            <View style={{ flex: 1, alignSelf: 'center' }}>
              <TwitterShareIcon
                title={topic.title}
                url={shareURL}
                hashtag="#Titan"
              />
            </View>
            {isCurrentUser ? (
              <View style={{ flex: 1, alignSelf: 'center' }}>
                <Text />
                <View style={{ flexDirection: 'row' }}>
                  <Button light>
                    <Link to={editTopicPath}>
                      <Text>編集</Text>
                    </Link>
                  </Button>
                  <Button
                    light
                    onPress={() => handleDelete(redirectPath, resourceId)}
                  >
                    <Text>削除</Text>
                  </Button>
                </View>
              </View>
            ) : null}
          </React.Fragment>
        ))}
    </React.Fragment>
  );
};

export default withRouter(Topic);
