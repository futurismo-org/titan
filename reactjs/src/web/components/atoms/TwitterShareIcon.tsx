import * as React from 'react';
import { TwitterShareButton, TwitterIcon } from 'react-share';

import styled from 'styled-components';

const TwitterIconWrapper = styled.div`
  width: 40px;
`;

const TwitterShareIcon = (props: any) => {
  const { title, url } = props;

  return (
    <TwitterIconWrapper>
      <TwitterShareButton title={title} url={url}>
        <TwitterIcon size={35} round />
      </TwitterShareButton>
    </TwitterIconWrapper>
  );
};

export default TwitterShareIcon;
