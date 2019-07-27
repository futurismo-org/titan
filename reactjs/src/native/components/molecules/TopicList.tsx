import * as React from 'react';
import { List, ListItem, Left, Thumbnail, Body, Text } from 'native-base';
import { Link } from 'react-router-native';
import { fromNow } from '~/lib/moment';

const TopicList = (props: any) => {
  const { topics, topicPath, limit } = props;
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
            <Link to={topicPath(topic.id)}>
              <Text>{topic.title}</Text>
            </Link>
            <Text note>
              Posted by {topic.userName} {fromNow(topic.createdAt.toDate())}
            </Text>
          </Body>
        </ListItem>
      ))}
    </List>
  );
};

export default TopicList;
