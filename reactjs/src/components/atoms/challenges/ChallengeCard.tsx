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

const StyledCard = styled(Card)`
  && {
    display: flex;
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
  const { challenge } = props;

  if (!challenge) {
    return <React.Fragment />;
  }

  if (challenge.draft) {
    return <React.Fragment />;
  }

  return (
    <Grid item key={challenge.title} xs={12} md={6}>
      <NoStyledLink to={`/challenges/${challenge.id}/overview`}>
        <CardActionArea>
          <StyledCard>
            <StyledCardDetails>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {challenge.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {challenge.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  もっと読む...
                </Typography>
              </CardContent>
            </StyledCardDetails>
            <Hidden xsDown>
              <StyledCardMedia
                image="https://source.unsplash.com/random"
                title="Image title"
              />
            </Hidden>
          </StyledCard>
        </CardActionArea>
      </NoStyledLink>
    </Grid>
  );
};

export default ChallengeCard;
