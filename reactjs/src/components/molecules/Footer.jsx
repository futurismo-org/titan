import React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import styled from 'styled-components';
import theme from '../../lib/theme';

const StyledLink = props => (
  <Link color="inherit" href="https://github.com/futurismo-org/">
    {props.text}
  </Link>
);

const StyledFooter = styled.footer`
  background-color: ${theme.palette.background.paper};
  margin-top: auto;
  padding: ${theme.spacing(6, 0)};
`;

const MadeWithLove = () => {
  return (
    <Typography align="center" variant="body2" color="textSecondary">
      {'Built with fire by the '}
      <StyledLink text="Futurismo" />
      {' team.'}
    </Typography>
  );
};

const Footer = () => (
  <StyledFooter>
    <Container maxWidth="lg">
      <Typography variant="h6" gutterBottom align="center">
        Titan
      </Typography>
      <Typography
        variant="subtitle1"
        color="textSecondary"
        component="p"
        align="center"
      >
        自己変革の火をつけるWebサービス <br />
        a.k.a. 地獄から天国へ
      </Typography>
      <MadeWithLove />
    </Container>
  </StyledFooter>
);

export default Footer;
