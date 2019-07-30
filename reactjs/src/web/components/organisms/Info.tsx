import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Paper>
        <Title text="その他" />
        <List>
          <ListItem>
            <ListItemText>利用規約</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>プライバシーポリシー</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>お知らせ</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>ご意見お問い合わせ</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>FAQ</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>ランディングペーシ</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Info;
