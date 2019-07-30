import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';

import styled from 'styled-components';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import Link from '../atoms/NoStyledLink';
import {
  TITAN_DISCORD_INVITE_URL,
  TITAN_TWITTER_URL,
  TITAN_BLOG_URL
} from '~/constants/appInfo';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';

const { loadCSS } = require('fg-loadcss');

const useStyles = makeStyles(theme => ({
  twitter: {
    margin: theme.spacing(2),
    color: '#4099FF'
  },
  rss: {
    margin: theme.spacing(2),
    color: 'orange'
  }
}));

const StyledRoot = styled.div`
  position: relative;
  top: 3px;
  left: 3px;
`;

const StyledDrawer = styled.div`
  width: 250px;
`;

const DrawerButton = (text: string, to: string) => (
  <Link to={to}>
    <Typography
      component="h5"
      variant="h6"
      align="center"
      style={{
        margin: 10
      }}
    >
      {text}
    </Typography>
  </Link>
);

const DrawerButtonALink = (text: string, to: string) => (
  <a href={to} style={{ textDecoration: 'none', color: 'inherit' }}>
    <Typography
      component="h5"
      variant="h6"
      align="center"
      style={{
        margin: 10
      }}
    >
      {text}
    </Typography>
  </a>
);

const Drawer = (props: any) => {
  const { user } = props;
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const isLogin = !user.isEmpty && user.isLoaded;

  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css') // eslint-disable-line
    );
  }, []);

  return (
    <React.Fragment>
      <StyledRoot>
        <IconButton color="inherit" onClick={() => setOpen(true)}>
          <Typography>
            <MenuIcon fontSize="large" />
          </Typography>
        </IconButton>
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          <StyledDrawer>
            {DrawerButton('ホーム', '/')}
            <Divider />
            {DrawerButton('チャレンジ', '/challenges')}
            <Divider />
            {DrawerButton('カテゴリ', '/categories')}
            <Divider />
            {DrawerButton('トピック', '/topics')}
            <Divider />
            {DrawerButton('ランキング', '/ranking')}
            <Divider />
            {DrawerButtonALink('チャット', TITAN_DISCORD_INVITE_URL)}
            <Divider />
            {isLogin && DrawerButton('ユーザ設定', '/settings')}
            <Divider />
            {DrawerButton('関連情報', '/info')}
            <Divider />
            {user.isAdmin && DrawerButton('管理設定', '/admin')}
            {user.isAdmin && <Divider />}
            <div style={{ textAlign: 'center' }}>
              <NoStyledExternalLink href={TITAN_TWITTER_URL}>
                <Icon className={clsx(classes.twitter, 'fab fa-twitter')} />
              </NoStyledExternalLink>
              <NoStyledExternalLink href={TITAN_BLOG_URL}>
                <Icon className={clsx(classes.rss, 'fas fa-rss')} />
              </NoStyledExternalLink>
            </div>
          </StyledDrawer>
        </SwipeableDrawer>
      </StyledRoot>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: {}) => ({
  user: state.firebase.profile,
  ...props
});

export default connect(mapStateToProps)(Drawer);
