import * as React from 'react';

import { Typography, Button } from '@material-ui/core';
import styled from 'styled-components';
import NoStyledExternalLink from '../atoms/NoStyledExternalLink';

const Container = styled.div`
  margin: 30px;
  text-align: center;
`;

const DemoPaper = () =>
  process.env.REACT_APP_ENV !== 'development' ? (
    <Container>
      <Typography variant="h3">アプリ公開前</Typography>
      <Typography variant="h4">ログインはできません</Typography>
      <br />
      <Typography variant="h4">公開前事前予約受付中</Typography>
      <Typography variant="h6">30人以上の登録で公開します</Typography>
      <Typography variant="h5">↓↓↓</Typography>
      <br />
      <NoStyledExternalLink href="https://www.newappplace.com/detail/55">
        <Button color="default" variant="contained" size="large">
          ここから
        </Button>
      </NoStyledExternalLink>
    </Container>
  ) : null;

export default DemoPaper;
