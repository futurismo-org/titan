import React, { useEffect } from 'react';
import { Button, Text, View, Content } from 'native-base';
import { Linking, Alert, TouchableOpacity } from 'react-native';
import { withRouter, Link } from 'react-router-native';
import Title from '../atoms/Title';
import Error from '../atoms/Error';

import { fromNow } from '~/lib/moment';
import TwitterShareIcon from '~/native/components/atoms/TwitterShareIcon';
import MarkdownView from '../atoms/MarkdownView';

import Progress from '../atoms/CircularProgress';
import * as firebase from '~/lib/firebase';
import Flag from '~/native/containers/FlagContainer';

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
    collection,
    collectionId,
    allowSensitive,
    fetchBlockingUsers,
    myUserId,
    blocked
  } = props;

  useEffect(() => {
    fetchTopic(resourceId);
    fetchBlockingUsers(myUserId);
  }, [fetchBlockingUsers, fetchTopic, myUserId, resourceId]);

  const handleDelete = (redirectPath: string, resourceId: string) => {
    Alert.alert(
      'トピック削除',
      '削除したデータは元に戻せません。本当に削除しますか？',
      [
        {
          text: 'はい',
          onPress: () =>
            firebase
              .remove(resourceId)
              .then(() => history.replace(redirectPath))
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
        (topic.freezed ? (
          <Text>
            このコンテンツは不適切なコンテンツと判断して運営が凍結しました。
          </Text>
        ) : topic.sensitive && !allowSensitive ? (
          <TouchableOpacity onPress={() => history.path('/settings')}>
            <Title text="センシティブな内容のあるコンテンツです" />
            <Text>設定を変更</Text>
          </TouchableOpacity>
        ) : blocked ? (
          <Content padder>
            <Title text="表示をブロックしました" />
            <Text>
              あなたはこの記事を投稿したユーザからブロックされているため、記事を閲覧できません。
            </Text>
          </Content>
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
              <Flag
                topic={topic}
                collectionType={collection}
                collectionId={collectionId}
              />
            </View>
            <Text />
            <TwitterShareIcon
              title={topic.title}
              url={shareURL}
              hashtag="#Titan"
            />
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
