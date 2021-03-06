import * as React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import styled from 'styled-components';
import moment from 'moment';
import theme from '~/lib/theme';

interface LinkProps {
  text?: string;
}

const StyledFooter = styled.footer`
  background-color: ${theme.palette.background.paper};
  margin-top: auto;
  padding: ${theme.spacing(6, 0)};
`;

const MadeWithLove = () => {
  return (
    <React.Fragment>
      <Typography align="center" variant="body2" color="textSecondary">
        Built with fire by the Futurismo team.
      </Typography>
      <Typography align="center" variant="body2" color="textSecondary">
        {`©${moment().year()} All Rights Reserved.`}
      </Typography>
    </React.Fragment>
  );
};

const Footer = () => (
  <StyledFooter>
    <Container>
      <Typography variant="h6" gutterBottom align="center">
        Titan
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        component="p"
        align="center"
      >
        自己変革の火をつけるアプリ <br />
        a.k.a. 地獄から天国へ
      </Typography>
      <MadeWithLove />
    </Container>
  </StyledFooter>
);

export default Footer;
