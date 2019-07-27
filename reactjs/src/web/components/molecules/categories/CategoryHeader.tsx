import * as React from 'react';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import theme from 'lib/theme';
import { getRandomImageURL } from '~/lib/url';

const MainFeaturedPost = styled(Paper)`
  && {
    position: relative;
    background-color: ${theme.palette.grey[800]};
    color: ${theme.palette.common.white};
    margin-bottom: ${theme.spacing(4)}px;
    background-image: url(https://source.unsplash.com/random);
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
  padding: ${theme.spacing(2)}px;
  ${theme.breakpoints.up('md')} {
    padding: ${theme.spacing(4)}px;
    padding-right: 0;
  }
`;

const CategoryHeader = (props: any) => {
  const { category } = props;

  return (
    <MainFeaturedPost>
      {/* Increase the priority of the hero background image */}
      {
        <img
          style={{ display: 'none' }}
          src={getRandomImageURL()}
          alt="background"
        />
      }
      <Overlay />
      <Grid container>
        <Grid item md={6}>
          <MainFeaturedPostContent>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {category.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {category.description}
            </Typography>
          </MainFeaturedPostContent>
        </Grid>
      </Grid>
    </MainFeaturedPost>
  );
};

export default CategoryHeader;
