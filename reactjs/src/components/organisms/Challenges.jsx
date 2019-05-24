import React from "react";
import gql from "graphql-tag";
import { useQuery } from "react-apollo-hooks";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Hidden from "@material-ui/core/Hidden";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

import theme from "../../lib/theme";

const GET_CHALLENGES = gql`
  {
    challenges {
      id
      title
      discription
    }
  }
`;

const StyledCardGrid = styled(Grid)`
  && {
    margin-top: ${theme.spacing(3)}px;
  }
`;

const StyledCard = styled(Card)`
  && {
    display: flex;
  }
`;

const StyledCardDetails = styled.div`
  flex: 1;
`;

const StyledCardMedia = styled(CardMedia)`
  && {
    width: 160px;
  }
`;

const Challenges = props => {
  const { data, error, loading } = useQuery(GET_CHALLENGES);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error! {error.message}</div>;
  }

  return (
    <React.Fragment>
      <StyledCardGrid container spacing={4}>
        {data.challenges.map(challenge => (
          <Grid item key={challenge.title} xs={12} md={6}>
            <CardActionArea component="a" href="#">
              <StyledCard>
                <StyledCardDetails>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {challenge.title}
                    </Typography>
                    {/* <Typography variant="subtitle1" color="textSecondary">
                          {challeng.date}
                        </Typography> */}
                    <Typography variant="subtitle1" paragraph>
                      {challenge.discription}
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
          </Grid>
        ))}
      </StyledCardGrid>
    </React.Fragment>
  );
};

export default Challenges;
