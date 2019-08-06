import * as React from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text } from 'native-base';

import { withRouter } from 'react-router-native';
import { TouchableOpacity } from 'react-native';
import { fromNow } from '~/lib/moment';

const TopicList = (props: any) => {
  const { topics, topicPath, limit, history } = props;
  return (
    <List>
      {topics.slice(0, limit).map((topic: any) => (
        <ListItem thumbnail key={topic.id}>
          <Left>
            <Thumbnail
              square
              source={{
                uri:
                  topic.userPhotoURL || 'https://titan-fire.com/anonymous.png'
              }}
            />
          </Left>
          <Body>
            <TouchableOpacity onPress={() => history.push(topicPath(topic.id))}>
              <Text>{topic.title}</Text>
              <Text note>
                Posted by {topic.userName} {fromNow(topic.createdAt.toDate())}
              </Text>
            </TouchableOpacity>
          </Body>
        </ListItem>
      ))}
    </List>
  );
};

export default withRouter(TopicList);
