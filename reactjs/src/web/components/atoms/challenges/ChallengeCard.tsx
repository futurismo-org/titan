import * as React from 'react';

import Card, { CardProps } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia, { CardMediaProps } from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';

import NoStyledLink from '../NoStyledLink';
import { getRandomImageURL } from '~/lib/url';

const StyledCard = styled(Card)`
  && {
    display: flex;
    font-family: 'M Plus 1p';
  }
` as React.ComponentType<CardProps>;

const StyledCardDetails = styled.div`
  flex: 1;
`;

const StyledCardMedia = styled(CardMedia)`
  && {
    width: 160px;
  }
` as React.ComponentType<CardMediaProps>;

const ChallengeCard = (props: any) => {
  const { challenge, allowSensitive } = props;

  if (!challenge) {
    return <React.Fragment />;
  }

  if (challenge.draft) {
    return <React.Fragment />;
  }

  //

  return (
    <React.Fragment>
      {challenge.sensitive && !allowSensitive ? (
        <Grid item key={challenge.title} xs={12} md={6}>
          <NoStyledLink to={`/c/${challenge.id}/overview`}>
            <CardActionArea>
              <StyledCard>
                <StyledCardDetails>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      センシティブな内容が含まれている可能性のあるコンテンツです
                    </Typography>
                    <Typography variant="subtitle1" paragraph color="primary">
                      設定を変更
                    </Typography>
                  </CardContent>
                </StyledCardDetails>
                <Hidden xsDown>
                  <StyledCardMedia
                    image="http://titan-fire.com/images/icons/icon-144x144.png"
                    title="Image title"
                  />
                </Hidden>
              </StyledCard>
            </CardActionArea>
          </NoStyledLink>
        </Grid>
      ) : (
        <Grid item key={challenge.title} xs={12} md={6}>
          <NoStyledLink to={`/c/${challenge.id}/overview`}>
            <CardActionArea>
              <StyledCard>
                <StyledCardDetails>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {challenge.title}
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      paragraph
                      style={{ fontStyle: 'italic' }}
                    >
                      {challenge.description}
                    </Typography>
                    <Typography variant="subtitle1" color="primary">
                      もっと読む...
                    </Typography>
                  </CardContent>
                </StyledCardDetails>
                <Hidden xsDown>
                  <StyledCardMedia
                    image={getRandomImageURL()}
                    title="Image title"
                  />
                </Hidden>
              </StyledCard>
            </CardActionArea>
          </NoStyledLink>
        </Grid>
      )}
    </React.Fragment>
  );
};

export default ChallengeCard;
