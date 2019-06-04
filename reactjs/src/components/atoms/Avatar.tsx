import * as React from 'react';
import Avatar, { AvatarProps } from '@material-ui/core/Avatar';

import styled from 'styled-components';

const defaultUserIcon = `${process.env.PUBLIC_URL}/anonymous.png`;

const StyledAvatar = styled(Avatar)`
  && {
    margin: 10px;
    background-color: white;
  }
` as React.ComponentType<AvatarProps>;

interface Props {
  src: string;
}

const UserIcon = (props: Props) => (
  <StyledAvatar alt="user icon" src={`${props.src || defaultUserIcon}`} />
);

export default UserIcon;
