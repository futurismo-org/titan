import React from 'react';

import { List, ListItem, Text, View } from 'native-base';
import { material } from 'react-native-typography';
import Title from '../atoms/Title';

import { meigens } from '~/lib/meigen';

const Item = (props: any) => {
  const { content, author } = props;

  return (
    <React.Fragment>
      <ListItem>
        <View>
          <Text style={{ fontSize: 24 }}>{content}</Text>
          <Text style={{ fontSize: 18, color: 'gray' }}>{author}</Text>
        </View>
      </ListItem>
    </React.Fragment>
  );
};

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Title text="努力の名言" />
      <List>
        {meigens.map((meigen: any) => (
          <Item
            content={meigen.content}
            author={meigen.author}
            key={meigen.content}
          />
        ))}
      </List>
    </React.Fragment>
  );
};

export default Info;
