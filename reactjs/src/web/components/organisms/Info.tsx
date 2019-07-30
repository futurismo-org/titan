import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Paper>
        <Title text="その他" />
        <List>
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink href="https://titan-fire.com/terms_of_use.html">
                利用規約
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink href="https://titan-fire.com/privacy_policy.html">
                プライバシーポリシー
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>お知らせ</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>ご意見お問い合わせ</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink href="https://titan-fire.netlify.com">
                Titan紹介ペーシ
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Info;
