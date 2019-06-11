import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import styled from 'styled-components';
import Link from '../atoms/NoStyledLink';

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

const Drawer = (props: any) => {
  const [open, setOpen] = useState(false);

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
            {DrawerButton('ランキング', '/')}
            <Divider />
            {DrawerButton('トピック', '/')}
            <Divider />
          </StyledDrawer>
        </SwipeableDrawer>
      </StyledRoot>
    </React.Fragment>
  );
};

export default Drawer;
