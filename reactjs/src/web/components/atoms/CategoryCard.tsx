import * as React from 'react';

import Card, { CardProps } from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia, { CardMediaProps } from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
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

const NoStyledLink = styled(Link)`
  && {
    text-decoration: none;
    color: inherit;
  }
`;

const CategoryCard = (props: any) => {
  const { category } = props;

  return (
    <Grid item key={category.title} xs={12} md={6}>
      <NoStyledLink to={`/cat/${category.id}/dashboard`}>
        <CardActionArea>
          <StyledCard>
            <StyledCardDetails>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {category.title}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {category.description}
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
  );
};

export default CategoryCard;
