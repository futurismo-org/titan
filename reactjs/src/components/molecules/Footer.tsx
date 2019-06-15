import * as React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import styled from 'styled-components';
import moment from 'moment';
import theme from '../../lib/theme';

interface LinkProps {
  text?: string;
}

const StyledLink = (props: LinkProps) => (
  <Link color="inherit" href="https://github.com/futurismo-org/">
    {props.text}
  </Link>
);

const FooterLinkContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledFooter = styled.footer`
  background-color: ${theme.palette.background.paper};
  margin-top: auto;
  padding: ${theme.spacing(6, 0)};
`;

const MadeWithLove = () => {
  return (
    <React.Fragment>
      <Typography align="center" variant="body2" color="textSecondary">
        {'Built with fire by the '}
        <StyledLink text="Futurismo" />
        {' team.'}
      </Typography>
      <Typography align="center" variant="body2" color="textSecondary">
        {`©${moment().year()} All Rights Reserved.`}
      </Typography>
    </React.Fragment>
  );
};

const FooterLink = (props: any) => (
  <StyledAnchor href={props.to}>
    <Typography variant="subtitle1" color="textSecondary" component="p">
      {props.text}
    </Typography>
  </StyledAnchor>
);

const StyledAnchor = styled.a`
  margin: 10px;
  color: inherit;
  text-decoration: none;
`;

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
      {/* <FooterLinkContainer>
        <FooterLink to="https://twitter.com/titan_dev_1234" text="Twitter" />
        <FooterLink to="https://note.mu/titan_dev" text="Blog" />
        <FooterLink to="https://github.com/futurismo-org/titan" text="GitHub" />
      </FooterLinkContainer> */}
    </Container>
  </StyledFooter>
);

export default Footer;
