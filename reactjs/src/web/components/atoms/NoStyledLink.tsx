import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

const NoStyledLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
  }
` as React.ComponentType<LinkProps>;

export default NoStyledLink;
