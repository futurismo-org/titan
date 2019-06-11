import React, { useState } from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import styled from 'styled-components';

const StyledRoot = styled.div`
  position: relative;
  top: 5px;
  left: 5px;
`;

const StyledDrawer = styled.div`
  width: 250px;
`;

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
            <Typography
              component="h5"
              variant="h6"
              align="center"
              style={{
                margin: 10
              }}
            >
              ホーム
            </Typography>
            <Divider />
          </StyledDrawer>
        </SwipeableDrawer>
      </StyledRoot>
    </React.Fragment>
  );
};

export default Drawer;
