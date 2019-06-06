import * as React from 'react';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import moment from 'moment';
import theme from '../../../lib/theme';
import JoinButton from '../../atoms/JoinButton';

const HeaderInfo = styled.div`
  display: flex;
`;

const MainFeaturedPost = styled(Paper)`
  && {
    position: relative;
    background-color: ${theme.palette.grey[800]};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(4)}px;
    background-image: url(https://source.unsplash.com/user/erondu);
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
` as React.ComponentType<PaperProps>;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;

const MainFeaturedPostContent = styled.div`
  position: relative;
  padding: ${theme.spacing(3)}px;
  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(6)}px;
    padding-right: 0;
  }
`;

const HeaderInfoText = styled(Typography)`
  padding-left: 10px;
` as React.ComponentType<TypographyProps>;

const ChallengePeriod = (props: any) => {
  const { challenge } = props;
  const openedAt = moment(challenge.openedAt.toDate());
  const closedAt = moment(challenge.closedAt.toDate());
  const today = moment(new Date());

  const ret = (props: any) => <React.Fragment>{props}</React.Fragment>;

  if (openedAt.diff(today, 'days') > 0) {
    return ret(`開催前: ${openedAt.fromNow()}`);
  } else if (
    openedAt.diff(today, 'days') <= 0 &&
    closedAt.diff(today, 'days') > 0
  ) {
    return ret(`開催終了まで: ${closedAt.fromNow()}`);
  } else {
    return ret(`開催終了: ${closedAt.toNow()}`);
  }
};

const ChallengeHeader = (props: any) => {
  const { challenge } = props;

  return (
    <MainFeaturedPost>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src="https://source.unsplash.com/user/erondu"
          alt="background"
        />
      }
      <Overlay />
      <Grid container>
        <Grid item md={9}>
          <MainFeaturedPostContent>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {challenge.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {challenge.description}
            </Typography>
            <HeaderInfo>
              <JoinButton challengeId={challenge.id} />
              <HeaderInfoText color="inherit" variant="subtitle1">
                {challenge.participantsCount}人参加中
              </HeaderInfoText>
              <HeaderInfoText color="inherit" variant="subtitle1">
                <ChallengePeriod challenge={challenge} />
              </HeaderInfoText>
            </HeaderInfo>
          </MainFeaturedPostContent>
        </Grid>
      </Grid>
    </MainFeaturedPost>
  );
};

export default ChallengeHeader;
