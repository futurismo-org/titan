import React, { forwardRef } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import Grid from '@material-ui/core/Grid';

import NoStyledLink from '../../atoms/NoStyledLink';
import { getChallengeUserGoalPath, getChallengeDashboardPath } from '~/lib/url';

const ChallengeNavbar = (props: any) => {
  const { challenge, userShortId, join } = props;
  const challengeId = challenge.id;

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
            <NoStyledLink to={`/c/${challengeId}/overview`}>概要</NoStyledLink>
          </Button>
          <Button>
            <NoStyledLink to={`/c/${challengeId}/rules`}>ルール</NoStyledLink>
          </Button>
          <Button onClick={handleClick}>その他</Button>
        </ButtonGroup>
      </Grid>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        onClose={handleClose}
        getContentAnchorEl={null}
      >
        <NavItem to={`/c/${challengeId}/leaderboard`} text="リーダーボード" />
        {join && (
          <NavItem
            to={getChallengeDashboardPath(challengeId, userShortId)}
            text="ダッシュボード"
          />
        )}
        <NavItem to={`/c/${challengeId}/goals`} text="ゴールボード" />
        <NavItem to={`/c/${challengeId}/topics`} text="トピック" />
        <NavItem to={`/c/${challengeId}/timeline`} text="タイムライン" />
        {join && (
          <NavItem
            to={getChallengeUserGoalPath(challengeId, userShortId)}
            text="努力ノート"
          />
        )}
        {join && (
          <NavItem
            to={`/c/${challengeId}/u/${userShortId}/settings`}
            text="ユーザ設定"
          />
        )}
      </Menu>
    </React.Fragment>
  );
};

export default ChallengeNavbar;
