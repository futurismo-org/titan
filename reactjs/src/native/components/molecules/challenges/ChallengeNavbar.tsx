import React, { useState } from 'react';

import { View } from 'react-native';
import Menu, { MenuItem } from 'react-native-material-menu';

import { Link, withRouter } from 'react-router-native';
import { Button, Text } from 'native-base';

const ChallengeNavbar = (props: any) => {
  const { challenge, isLogin, userShortId, history } = props;
  const [menuRef, setMenuRef] = useState();

  const challengeId = challenge.id;

  const hideMenu = (path: string) => {
    history.push(path);
    menuRef.hide();
  };

  const showMenu = () => {
    menuRef.show();
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        alignSelf: 'center'
      }}
    >
      <Button bordered style={{ width: 100, justifyContent: 'center' }}>
        <Link to={`/c/${challengeId}/overview`}>
          <Text>概要</Text>
        </Link>
      </Button>
      <Button
        bordered
        style={{ width: 100, marginLeft: 5, justifyContent: 'center' }}
      >
        <Link to={`/c/${challengeId}/rules`}>
          <Text>ルール</Text>
        </Link>
      </Button>
      <Menu
        ref={(ref: any) => setMenuRef(ref)}
        button={
          <Button
            bordered
            style={{ width: 100, marginLeft: 5, justifyContent: 'center' }}
          >
            <Text onPress={showMenu}>その他</Text>
          </Button>
        }
      >
        {/* <MenuItem onPress={hideMenu}>タイムライン</MenuItem> */}
        <MenuItem onPress={() => hideMenu(`/c/${challengeId}/leaderboard`)}>
          リーダボード
        </MenuItem>
        {isLogin && (
          <MenuItem
            onPress={() => hideMenu(`/c/${challengeId}/u/${userShortId}`)}
          >
            ダッシュボード
          </MenuItem>
        )}
        <MenuItem onPress={() => hideMenu(`/c/${challengeId}/topics`)}>
          トピック
        </MenuItem>
        {isLogin && (
          <MenuItem
            onPress={() =>
              hideMenu(`/c/${challengeId}/u/${userShortId}/settings`)
            }
          >
            ユーザ設定
          </MenuItem>
        )}
      </Menu>
    </View>
  );
};
// const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

// const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//   setAnchorEl(event.currentTarget);
// };

// const handleClose = () => {
//   setAnchorEl(null);
// };

// const NavItem = forwardRef((props: any, ref: any) => (
//   <MenuItem ref={ref} onClick={handleClose}>
//     <NoStyledLink to={props.to}>{props.text}</NoStyledLink>
//   </MenuItem>
// ));

// return (
//   <React.Fragment>
//     <Grid item xs={12}>
//       <ButtonGroup fullWidth>
//         <Button>
//           <NoStyledLink to={`/c/${props.id}/overview`}>概要</NoStyledLink>
//         </Button>
//         <Button>
//           <NoStyledLink to={`/c/${props.id}/rules`}>ルール</NoStyledLink>
//         </Button>
//         <Button onClick={handleClick}>その他</Button>
//       </ButtonGroup>
//     </Grid>
//     <Menu
//       id="simple-menu"
//       anchorEl={anchorEl}
//       keepMounted
//       open={Boolean(anchorEl)}
//       onClose={handleClose}
//     >
//       <NavItem to={`/c/${props.id}/timeline`} text="タイムライン" />
//       <NavItem to={`/c/${props.id}/topics`} text="トピック" />
//       <NavItem to={`/c/${props.id}/leaderboard`} text="リーダーボード" />
//       {props.userId && (
//         <NavItem
//           to={`/c/${props.id}/u/${props.userId}`}
//           text="ダッシュボード"
//         />
//       )}
//       {props.userId && (
//         <NavItem
//           to={`/c/${props.id}/u/${props.userId}/settings`}
//           text="ユーザ設定"
//         />
//       )}
//     </Menu>
//   </React.Fragment>
// );

export default withRouter(ChallengeNavbar);
