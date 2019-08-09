import * as React from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text } from 'native-base';

import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { fromNow } from '~/lib/moment';
import UserAvatar from '../atoms/UserAvatar';

const TopicListItem = (props: any) => {
  const { topic, history, allowSensitive, topicPath } = props;

  return (
    <ListItem thumbnail>
      <Left>
        <UserAvatar userId={topic.userId} photoURL={topic.userPhotoURL} />
      </Left>
      <Body>
        {topic.sensitive && !allowSensitive ? (
          <TouchableOpacity onPress={() => history.push('/settings')}>
            <Text>
              センシティブな内容が含まれている可能性のあるコンテンツです
            </Text>
            <Text note>設定を変更</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => history.push(topicPath(topic.id))}>
            <Text>{topic.title}</Text>
            <Text note>
              Posted by {topic.userName} {fromNow(topic.createdAt.toDate())}
            </Text>
          </TouchableOpacity>
        )}
      </Body>
    </ListItem>
  );
};

const TopicList = (props: any) => {
  const { topics, limit } = props;
  return (
    <List>
      {topics.slice(0, limit).map((topic: any) => (
        <TopicListItem topic={topic} {...props} key={topic.id} />
      ))}
    </List>
  );
};

export default withRouter(TopicList);
