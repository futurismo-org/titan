import * as React from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Link from '@material-ui/core/Link';

import styled from 'styled-components';
import moment from 'moment';
import theme from '~/lib/theme';

import NoStyledExternalLink from '../atoms/NoStyledExternalLink';

interface LinkProps {
  text?: string;
}

const StyledLink = (props: LinkProps) => (
  <Link color="inherit" href="https://titan-fire.netlify.com">
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
      <Typography align="center" variant="body2" color="textSecondary">
        <NoStyledExternalLink href="https://titan-fire.com/terms_of_use.html">
          利用規約
        </NoStyledExternalLink>{' '}
        <NoStyledExternalLink href="https://titan-fire.com/privacy_policy.html">
          プライバシーポリシー
        </NoStyledExternalLink>
      </Typography>
      <MadeWithLove />
    </Container>
  </StyledFooter>
);

export default Footer;
