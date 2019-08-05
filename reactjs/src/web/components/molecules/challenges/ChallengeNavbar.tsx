import React, { forwardRef } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Grid from '@material-ui/core/Grid';

import { connect } from 'react-redux';

import NoStyledLink from '../../atoms/NoStyledLink';

const ChallengeNavbar = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const NavItem = forwardRef((props: any, ref: any) => (
    <MenuItem ref={ref} onClick={handleClose}>
      <NoStyledLink to={props.to}>{props.text}</NoStyledLink>
    </MenuItem>
  ));

  return (
    <React.Fragment>
      <Grid item xs={12}>
        <ButtonGroup fullWidth>
          <Button>
            <NoStyledLink to={`/c/${props.id}/overview`}>概要</NoStyledLink>
          </Button>
          <Button>
            <NoStyledLink to={`/c/${props.id}/rules`}>ルール</NoStyledLink>
          </Button>
          <Button onClick={handleClick}>その他</Button>
        </ButtonGroup>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NavItem to={`/c/${props.id}/timeline`} text="タイムライン" />
        <NavItem to={`/c/${props.id}/leaderboard`} text="リーダーボード" />
        {props.userId && (
          <NavItem
            to={`/c/${props.id}/u/${props.userId}`}
            text="ダッシュボード"
          />
        )}
        <NavItem to={`/c/${props.id}/topics`} text="トピック" />
        {props.userId && (
          <NavItem
            to={`/c/${props.id}/u/${props.userId}/settings`}
            text="ユーザ設定"
          />
        )}
      </Menu>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any, props: any) => ({
  userId: state.firebase.profile.shortId || undefined,
  ...props
});

export default connect(mapStateToProps)(ChallengeNavbar);
