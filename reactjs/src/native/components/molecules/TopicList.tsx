import * as React from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text } from 'native-base';
import moment from 'moment';
import { Link } from 'react-router-native';

const TopicList = (props: any) => {
  const { topics, topicPath } = props;
  return (
    <List>
      {topics.map((topic: any) => (
        <ListItem thumbnail key={topic.id}>
          <Left>
            <Thumbnail square source={{ uri: topic.userPhotoURL }} />
          </Left>
          <Body>
            <Link to={topicPath(topic.id)}>
              <Text>{topic.title}</Text>
            </Link>
            <Text note>
              Posted by {topic.userName}{' '}
              {moment(topic.createdAt.toDate()).fromNow() || ''}
            </Text>
          </Body>
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;
