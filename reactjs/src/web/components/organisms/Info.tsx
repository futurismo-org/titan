import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';
import NoStyledLink from '../atoms/NoStyledLink';
import {
  TITAN_LANDING_PAGE,
  TITAN_GOOGLE_PLAY_STORE
} from '~/constants/appInfo';
import { BUILD_TIMESTAMP, BUILD_COMMIT_ID } from '~/constants/buildInfo'; // eslint-disable-line

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Paper>
        <Title text="関連情報" />
        <List>
          <ListItem>
            <ListItemText>
              <NoStyledLink to="/terms_of_use">利用規約</NoStyledLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledLink to="/privacy_policy">
                プライバシーポリシー
              </NoStyledLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledLink to="/guidelines">
                コミュニティガイドライン
              </NoStyledLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledLink to="/info/announce">お知らせ</NoStyledLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink
                href={TITAN_LANDING_PAGE}
                style={{ textDecoration: 'underline' }}
              >
                Titan紹介ペーシ
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink
                href={TITAN_GOOGLE_PLAY_STORE}
                style={{ textDecoration: 'underline' }}
              >
                Androidアプリ[Google Play]
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink
                href="#"
                style={{ textDecoration: 'underline' }}
              >
                iOSアプリ[Apple Store](準備中)
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>
              <NoStyledLink to="/meigen">努力の名言集</NoStyledLink>
            </ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>Build Date: {BUILD_TIMESTAMP}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>Build ID: {BUILD_COMMIT_ID}</ListItemText>
          </ListItem>
          <Divider />
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Info;
