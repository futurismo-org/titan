import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Title from '../atoms/Title';
import Paper from '../templates/PaperWrapper';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';
import NoStyledLink from '../atoms/NoStyledLink';
import {
  TITAN_PRIVACY_POLICY,
  TITAN_TERMS_OF_USE,
  TITAN_LANDING_PAGE,
  TITAN_GOOGLE_PLAY_STORE
} from '~/constants/appInfo';
import { BUILD_TIMESTAMP } from '~/constants/buildInfo'; // eslint-disable-line

const Info = (props: any) => {
  return (
    <React.Fragment>
      <Paper>
        <Title text="関連情報" />
        <List>
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink href={TITAN_TERMS_OF_USE}>
                利用規約
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NoStyledExternalLink href={TITAN_PRIVACY_POLICY}>
                プライバシーポリシー
              </NoStyledExternalLink>
            </ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>
              <NoStyledLink to="/info/announce">お知らせ</NoStyledLink>
            </ListItemText>
          </ListItem>
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
          <ListItem>
            <ListItemText>Build: {BUILD_TIMESTAMP}</ListItemText>
          </ListItem>
        </List>
      </Paper>
    </React.Fragment>
  );
};

export default Info;
