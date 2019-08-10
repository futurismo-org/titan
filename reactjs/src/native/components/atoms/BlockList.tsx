import React from 'react';
import { List, ListItem, Left, Body, Text } from 'native-base';

import { TouchableOpacity } from 'react-native';
import { formatDatetime } from '~/lib/moment';
import UserAvatar from './UserAvatar';

const BlockList = (props: any) => {
  const { items } = props;

  return (
    <List>
      {items.map((item: any) => (
        <ListItem key={item.id} thumbnail>
          <Left>
            <UserAvatar
              photoURL={item.blockedUserPhotoURL}
              userId={item.blockedUserId}
            />
          </Left>
          <Body>
            <TouchableOpacity>
              <Text>{item.blockedUserDisplayName}</Text>
              <Text note>
                {`追加日 ${formatDatetime(item.createdAt.toDate())}`}
              </Text>
            </TouchableOpacity>
          </Body>
        </ListItem>
      ))}
    </List>
  );
};

export default BlockList;
